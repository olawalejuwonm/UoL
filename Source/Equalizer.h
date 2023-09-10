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
class Equalizer : public juce::Component, public juce::AudioAppComponent, private juce::Timer
{
public:
  Equalizer();
  ~Equalizer() override;

  void paint(juce::Graphics &) override;
  void resized() override;
  enum
  {
    fftOrder = 11,           // [1]
    fftSize = 1 << fftOrder, // [2]
    scopeSize = 512          // [3]
  };

private:
  juce::dsp::FFT forwardFFT;                  // [4]
  juce::dsp::WindowingFunction<float> window; // [5]

  float fifo[fftSize];            // [6]
  float fftData[2 * fftSize];     // [7]
  int fifoIndex = 0;              // [8]
  bool nextFFTBlockReady = false; // [9]
  float scopeData[scopeSize];     // [10]
  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(Equalizer)
};
