/*
  ==============================================================================

    AnalyserController.cpp
    Created: 11 Sep 2023 7:35:35pm
    Author:  USER

  ==============================================================================
*/

#include <JuceHeader.h>
#include "AnalyserController.h"

//==============================================================================
AnalyserController::AnalyserController()
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

AnalyserController::~AnalyserController()
{
  shutdownAudio();
}

void AnalyserController::paint(juce::Graphics &g)
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
  g.drawText("AnalyserController", getLocalBounds(),
             juce::Justification::centred, true); // draw some placeholder text
}

void AnalyserController::resized()
{
  // This method is where you should set the bounds of any child
  // components that your component contains..
}

void AnalyserController::getNextAudioBlock(const juce::AudioSourceChannelInfo &bufferToFill)
{
  if (bufferToFill.buffer->getNumChannels() > 0)
  {
    auto *channelData = bufferToFill.buffer->getReadPointer(0, bufferToFill.startSample);

    for (auto i = 0; i < bufferToFill.numSamples; ++i)
      analyserModel.pushNextSampleIntoFifo(channelData[i]);
  }
}

void AnalyserController::timerCallback()
{
  if (analyserModel.nextFFTBlockReady)
  {
    analyserModel.drawNextFrameOfSpectrum();
    analyserModel.nextFFTBlockReady = false;
     analyserModel.repaint();
  }
}
