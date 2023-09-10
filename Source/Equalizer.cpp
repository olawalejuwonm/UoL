/*
  ==============================================================================

    Equalizer.cpp
    Created: 10 Sep 2023 10:54:12am
    Author:  USER

  ==============================================================================
*/

#include <JuceHeader.h>
#include "Equalizer.h"

//==============================================================================
Equalizer::Equalizer()
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.

}

Equalizer::~Equalizer()
{
}

void Equalizer::paint (juce::Graphics& g)
{
    /* This demo code just fills the component's background and
       draws some placeholder text to get you started.

       You should replace everything in this method with your own
       drawing code..
    */

    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));   // clear the background

    g.setColour (juce::Colours::grey);
    g.drawRect (getLocalBounds(), 1);   // draw an outline around the component

    g.setColour (juce::Colours::white);
    g.setFont (14.0f);
    g.drawText ("Equalizer", getLocalBounds(),
                juce::Justification::centred, true);   // draw some placeholder text
}

void Equalizer::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..

}
