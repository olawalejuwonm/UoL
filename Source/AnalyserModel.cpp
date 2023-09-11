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
}

AnalyserModel::~AnalyserModel()
{
}

void AnalyserModel::paint(juce::Graphics &g)
{
  /* This demo code just fills the component's background and
     draws some placeholder text to get you started.

     You should replace everything in this method with your own
     drawing code..
  */

  g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId)); // clear the background

  g.setColour(juce::Colours::grey);
  g.drawRect(getLocalBounds(), 1); // draw an outline around the component

  g.setColour(juce::Colours::white);
  g.setFont(14.0f);
  g.drawText("AnalyserModel", getLocalBounds(),
             juce::Justification::centred, true); // draw some placeholder text
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
