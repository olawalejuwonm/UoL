/*
  ==============================================================================

    Equalizer.h
    Created: 10 Sep 2023 10:54:12am
    Author:  USER

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class Equalizer  : public juce::Component
{
public:
    Equalizer();
    ~Equalizer() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Equalizer)
};
