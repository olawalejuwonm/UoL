/*
  ==============================================================================

    AnalyserController.h
    Created: 11 Sep 2023 7:35:35pm
    Author:  USER

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class AnalyserController  : public juce::Component
{
public:
    AnalyserController();
    ~AnalyserController() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (AnalyserController)
};
