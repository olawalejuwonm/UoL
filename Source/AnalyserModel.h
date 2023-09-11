/*
  ==============================================================================

    AnalyserModel.h
    Created: 11 Sep 2023 7:34:59pm
    Author:  USER

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class AnalyserModel  : public juce::Component
{
public:
    AnalyserModel();
    ~AnalyserModel() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (AnalyserModel)
};
