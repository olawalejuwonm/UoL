// /*
//   ==============================================================================

//     AnalyserDisplay.cpp
//     Created: 11 Sep 2023 7:34:33pm
//     Author:  USER

//   ==============================================================================
// */

// #include <JuceHeader.h>
// #include "AnalyserDisplay.h"

// //==============================================================================
// AnalyserDisplay::AnalyserDisplay()
// {
//   // In your constructor, you should add any child components, and
//   // initialise any special settings that your component needs.
// }

// AnalyserDisplay::~AnalyserDisplay()
// {
// }

// void AnalyserDisplay::paint(juce::Graphics &g)
// {
//   /* This demo code just fills the component's background and
//      draws some placeholder text to get you started.

//      You should replace everything in this method with your own
//      drawing code..
//   */

//   g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId)); // clear the background

//   g.setColour(juce::Colours::grey);
//   g.drawRect(getLocalBounds(), 1); // draw an outline around the component

//   g.setColour(juce::Colours::white);
//   g.setFont(14.0f);
//   g.drawText("AnalyserDisplay", getLocalBounds(),
//              juce::Justification::centred, true); // draw some placeholder text
// }

// void AnalyserDisplay::resized()
// {
//   // This method is where you should set the bounds of any child
//   // components that your component contains..
// }

// void AnalyserDisplay::drawNextFrameOfSpectrum()
// {
//   // first apply a windowing function to our data
//   window.multiplyWithWindowingTable(fftData, fftSize); // [1]

//   // then render our FFT data..
//   forwardFFT.performFrequencyOnlyForwardTransform(fftData); // [2]

//   auto mindB = -100.0f;
//   auto maxdB = 0.0f;

//   // the for loop for every point in the scope width, calculate the level
//   // proportionally to the desired minimum and maximum decibels.
//   // To do this, we first need to skew the x-axis to use a logarithmic
//   // scale to better represent our frequencies. We can then feed this
//   // scaling factor to retrieve the correct array index and use the
//   // amplitude value to map it to a range between 0.0 .. 1.0.
//   for (int i = 0; i < scopeSize; ++i)
//   {
//     auto skewedProportionX = 1.0f - std::exp(std::log(1.0f - (float)i / (float)scopeSize) * 0.2f);
//     auto fftDataIndex = juce::jlimit(0, fftSize / 2, (int)(skewedProportionX * (float)fftSize * 0.5f));
//     auto level = juce::jmap(juce::jlimit(mindB, maxdB, juce::Decibels::gainToDecibels(fftData[fftDataIndex]) - juce::Decibels::gainToDecibels((float)fftSize)),
//                             mindB, maxdB, 0.0f, 1.0f);

//     // Finally set the appropriate point with the correct amplitude to prepare the drawing process.
//     scopeData[i] = level;
//   }
// }

// void AnalyserDisplay::drawFrame(juce::Graphics &g)
// {
//   for (int i = 1; i < scopeSize; ++i)
//   {
//     auto width = getLocalBounds().getWidth();
//     auto height = getLocalBounds().getHeight();

//     g.drawLine({(float)juce::jmap(i - 1, 0, scopeSize - 1, 0, width),
//                 juce::jmap(scopeData[i - 1], 0.0f, 1.0f, (float)height, 0.0f),
//                 (float)juce::jmap(i, 0, scopeSize - 1, 0, width),
//                 juce::jmap(scopeData[i], 0.0f, 1.0f, (float)height, 0.0f)});
//   }
// }
