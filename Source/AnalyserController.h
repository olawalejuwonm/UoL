/*
  ==============================================================================

    AnalyserController.h
    Created: 11 Sep 2023 7:35:35pm
    Author:  USER

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

#include "AnalyserModel.h"

//==============================================================================
/*
 */
class AnalyserController : public juce::AudioAppComponent,
                           private juce::Timer
{
public:
  AnalyserController();
  ~AnalyserController() override;

  void paint(juce::Graphics &) override;
  void resized() override;

  // Overrides for the AudioAppComponent class
  void prepareToPlay(int, double) override {}
  void releaseResources() override {}

  // push all the samples contained in the current audio buffer block to
  void getNextAudioBlock(const juce::AudioSourceChannelInfo &bufferToFill) override;

  void timerCallback() override;

private:
  AnalyserModel analyserModel;
  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(AnalyserController)
};
