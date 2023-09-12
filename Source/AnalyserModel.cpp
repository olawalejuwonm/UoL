/*
  ==============================================================================

    AnalyserModel.cpp
    Created: 11 Sep 2023 7:34:59pm
    Author:  USER

  ==============================================================================
*/

#include <JuceHeader.h>
#include "AnalyserModel.h"

//==============================================================================
AnalyserModel::AnalyserModel() : forwardFFT(fftOrder),                                      // initialise the variables
                                 window(fftSize, juce::dsp::WindowingFunction<float>::hann) // initialise the windowing function
{
  // In your constructor, you should add any child components, and
  // initialise any special settings that your component needs.
  // In your constructor, you should add any child components, and
  // initialise any special settings that your component needs.
  setOpaque(true);
  setAudioChannels(0, 0); // we want a couple of input channels but no outputs
  startTimerHz(30);
  setSize(700, 500);
}

AnalyserModel::~AnalyserModel()
{
  shutdownAudio();
}

void AnalyserModel::paint(juce::Graphics &g)
{
  /* This demo code just fills the component's background and
     draws some placeholder text to get you started.

     You should replace everything in this method with your own
     drawing code..
  */

  g.fillAll(juce::Colours::black);

  g.setOpacity(1.0f);
  g.setColour(juce::Colours::white);
  drawFrame(g);
}

void AnalyserModel::resized()
{
  // This method is where you should set the bounds of any child
  // components that your component contains..
}

void AnalyserModel::pushNextSampleIntoFifo(float sample) noexcept
{
  // if the fifo contains enough data, set a flag to say
  // that the next frame should now be rendered..
  // If the fifo contains enough data in this case 2048 samples,
  // we are ready to copy the data to the fftData array for it to be
  // processed by the FFT. We also set a flag to say that the next line
  // should now be rendered and always reset the index to 0 to start filling the fifo again.

  if (fifoIndex == fftSize)
  {
    if (!nextFFTBlockReady) // Every time this function gets called,
    // a sample is stored in the fifo and the index is incremented
    {
      juce::zeromem(fftData, sizeof(fftData));
      memcpy(fftData, fifo, sizeof(fifo));
      nextFFTBlockReady = true;
    }

    fifoIndex = 0; // Reset the fifoIndex to 0 to start filling the fifo again
  }

  // Every time this function gets called, a sample is stored in the fifo and the index is incremented.
  fifo[fifoIndex++] = sample;
}

void AnalyserModel::drawNextFrameOfSpectrum()
{
  // first apply a windowing function to our data
  window.multiplyWithWindowingTable(fftData, fftSize); // [1]

  // then render our FFT data..
  forwardFFT.performFrequencyOnlyForwardTransform(fftData); // [2]

  auto mindB = -100.0f;
  auto maxdB = 0.0f;

  // the for loop for every point in the scope width, calculate the level
  // proportionally to the desired minimum and maximum decibels.
  // To do this, we first need to skew the x-axis to use a logarithmic
  // scale to better represent our frequencies. We can then feed this
  // scaling factor to retrieve the correct array index and use the
  // amplitude value to map it to a range between 0.0 .. 1.0.
  for (int i = 0; i < scopeSize; ++i)
  {
    auto skewedProportionX = 1.0f - std::exp(std::log(1.0f - (float)i / (float)scopeSize) * 0.2f);
    auto fftDataIndex = juce::jlimit(0, fftSize / 2, (int)(skewedProportionX * (float)fftSize * 0.5f));
    auto level = juce::jmap(juce::jlimit(mindB, maxdB, juce::Decibels::gainToDecibels(fftData[fftDataIndex]) - juce::Decibels::gainToDecibels((float)fftSize)),
                            mindB, maxdB, 0.0f, 1.0f);

    // Finally set the appropriate point with the correct amplitude to prepare the drawing process.
    scopeData[i] = level;
  }
}

void AnalyserModel::drawFrame(juce::Graphics &g)
{
  for (int i = 1; i < scopeSize; ++i)
  {
    auto width = getLocalBounds().getWidth();
    auto height = getLocalBounds().getHeight();

    g.drawLine({(float)juce::jmap(i - 1, 0, scopeSize - 1, 0, width),
                juce::jmap(scopeData[i - 1], 0.0f, 1.0f, (float)height, 0.0f),
                (float)juce::jmap(i, 0, scopeSize - 1, 0, width),
                juce::jmap(scopeData[i], 0.0f, 1.0f, (float)height, 0.0f)});
  }
}

void AnalyserModel::getNextAudioBlock(const juce::AudioSourceChannelInfo &bufferToFill)
{
  if (bufferToFill.buffer->getNumChannels() > 0)
  {
    auto *channelData = bufferToFill.buffer->getReadPointer(0, bufferToFill.startSample);

    for (auto i = 0; i < bufferToFill.numSamples; ++i)
      pushNextSampleIntoFifo(channelData[i]);
  }
  // std::cout << "AnalyserModel::getNextAudioBlock" << std::endl;
}

void AnalyserModel::timerCallback()
{
  if (nextFFTBlockReady)
  {
    drawNextFrameOfSpectrum();
    nextFFTBlockReady = false;
    juce::Component::repaint();
  }
}
