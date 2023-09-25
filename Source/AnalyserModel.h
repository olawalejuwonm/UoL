/*
  ==============================================================================

    AnalyserModel.h
    Created: 11 Sep 2023 7:34:59pm
    Author:  Micheal

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

using namespace juce;

//==============================================================================
/**
 * @class AnalyserModel
 * @brief This class represents the model of an audio analyzer.
 * 
 * This class inherits from the AudioAppComponent class and overrides its methods.
 * It contains methods to prepare and release audio resources, paint and resize graphics,
 * push audio samples into a fifo buffer, draw the next frame of the spectrum, get the next audio block,
 * and handle timer callbacks. It also contains enumerated values for the size of the FFT window and the number of points on which it will operate,
 * the size of the scope, and a temporary boolean that tells whether the next FFT block is ready to be rendered.
 * 
 * @see AudioAppComponent
 */
class AnalyserModel : public AudioAppComponent,
                      private Timer
{
public:
  /**
   * @brief Default constructor for AnalyserModel class.
   */
  AnalyserModel();

  /**
   * @brief Destructor for AnalyserModel class.
   */
  ~AnalyserModel() override;

  /**
   * @brief Prepare to play audio accept.
   *
   * @param samplesPerBlockExpected The number of samples per block expected.
   * @param sampleRate The sample rate.
   */
  void prepareToPlay(int samplesPerBlockExpected, double sampleRate) override {}

  /**
   * @brief Release audio resources.
   */
  void releaseResources() override {}

  /**
   * @brief Paint the graphics.
   *
   * @param g The Graphics object to paint.
   */
  void paint(juce::Graphics &g) override;

  /**
   * @brief Resize the graphics.
   */
  void resized() override;

  /**
   * @brief Push the next audio sample into the fifo buffer.
   *
   * @param sample The audio sample to push into the fifo buffer.
   */
  void pushNextSampleIntoFifo(float sample) noexcept;

  /**
   * @brief Draw the next frame of the spectrum.
   */
  void drawNextFrameOfSpectrum();

  /**
   * @brief Draw the frame.
   *
   * @param g The Graphics object to draw the frame.
   */
  void drawFrame(juce::Graphics &g);

  /**
   * @brief Get the next audio block.
   *
   * @param bufferToFill The AudioSourceChannelInfo object to fill with the next audio block.
   */
  void getNextAudioBlock(const juce::AudioSourceChannelInfo &bufferToFill) override;

  /**
   * @brief Timer callback.
   */
  void timerCallback() override;

  // Initiate AnalyserController object
  // AnalyserController *analyserController;

  /**
   * @brief Enumerated values for the size of the FFT window and the number of points on which it will operate,
   * the size of the scope, and a temporary boolean that tells whether the next FFT block is ready to be rendered.
   */
  enum
  {
    fftOrder = 11,           // This designates the size of the FFT window and the number of points on which it will operate
    fftSize = 1 << fftOrder, // fftSize use a left bit shift operator which produces 1024 as binary number
    scopeSize = 512          // This is the size of the scope set the number of points in the visual representation of the spectrum as a scope size of 512.
  };

  /**
   * @brief This temporary boolean tells whether the next FFT block is ready to be rendered.
   */
  bool nextFFTBlockReady = false;

private:
  /**
   * @brief Object to perform the forward FFT on.
   */
  juce::dsp::FFT forwardFFT;

  /**
   * @brief Object to apply the windowing function on the signal.
   */
  juce::dsp::WindowingFunction<float> window;

  // DJAudioPlayer *player;

  /**
   * @brief This fifo float array of size 1024 will contains the incoming audio data in samples.
   */
  float fifo[fftSize];

  /**
   * @brief The fftData float array of size 4096 will contain the results of our FFT calculations which is basically calculated as
   * 2 * fftSize = 2 * ( 2 ^ 11 ) = 2 * 2048 = 4096 (real and imaginary parts).
   */
  float fftData[2 * fftSize];

  /**
   * @brief This temporary index keeps count of the amount of samples in the fifo.
   */
  int fifoIndex = 0;

  /**
   * @brief The index keeps count of the amount of samples in the fifo.
   */
  float scopeData[scopeSize];

  /**
   * @brief Macro to declare non-copyable classes.
   */
  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(AnalyserModel)
};
