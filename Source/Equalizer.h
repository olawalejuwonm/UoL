/*
  ==============================================================================

    Equalizer.h
    Created: 10 Sep 2023 10:54:12am
    Author:  USER

  ==============================================================================
*/



//==============================================================================
/*
 */

#pragma once

// #include "../JuceLibraryCode/JuceHeader.h"
#include <JuceHeader.h>

using namespace juce;


class Equalizer : public juce::Component,
                  public juce::AudioAppComponent,
                  private juce::Timer
{
public:
  Equalizer();
  ~Equalizer() override;

  // Overrides for the AudioAppComponent class
  void prepareToPlay(int, double) override {}
  void releaseResources() override {}

  // push all the samples contained in the current audio buffer block to
  void getNextAudioBlock(const juce::AudioSourceChannelInfo &bufferToFill) override;

  void paint(juce::Graphics &) override;
  void resized() override;

  void timerCallback() override;

  void pushNextSampleIntoFifo(float sample) noexcept;

  void drawNextFrameOfSpectrum();

  void drawFrame(juce::Graphics &g);

  enum
  {
    // This designates the size of the FFT window and the number of points on which it will operate
    fftOrder = 11,           // [1]
                             // fftSize use a left bit shift operator which produces 1024 as binary number
    fftSize = 1 << fftOrder, // [2]
                             // This is the size of the scope
                             // set the number of points in the visual representation of the spectrum as a scope size of 512.
    scopeSize = 512          // [3]
  };

private:
  //  object to perform the forward FFT on
  juce::dsp::FFT forwardFFT;
  // object to apply the windowing function on the signal
  juce::dsp::WindowingFunction<float> window;

  // This fifo float array of size 1024 will
  // contains the incomingsetBounds audio data in samples
  float fifo[fftSize]; //
  // The fftData float array of size 4096 will contain the results of our
  // FFT calculations which is basically calculated as
  // 2 * fftSize = 2 * ( 2 ^ 11 ) = 2 * 2048 = 4096 (real and imaginary parts)
  float fftData[2 * fftSize]; //
  // This temporary index keeps count of the amount of
  // samples in the fifo
  int fifoIndex = 0; // The index keeps count of the amount of samples
  // in the fifo.

  // This temporary boolean tells whether the next
  // FFT block is ready to be rendered.
  bool nextFFTBlockReady = false;
  // scopeData float array of size 512 will contain the points to display
  // on the screen
  float scopeData[scopeSize];
  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(Equalizer)
};
