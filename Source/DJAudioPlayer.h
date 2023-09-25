/*
  ==============================================================================

    DJAudioPlayer.h
    Created: 13 Aug 2023 5:40:40pm
    Author:  Micheal

  ==============================================================================
*/

#pragma once

#include "../JuceLibraryCode/JuceHeader.h"
#include "AnalyserModel.h"


using namespace juce;

/**
 * @class DJAudioPlayer
 * @brief A class that represents an audio player with various functionalities such as loading audio files, setting gain, speed, and position, starting and stopping playback, and analyzing audio.
 * 
 * This class inherits from the JUCE AudioSource class and implements its pure virtual functions. It also contains a ResamplingAudioSource object that is used for resampling audio data.
 * 
 * @see AudioSource, ResamplingAudioSource
 */

class DJAudioPlayer : public AudioSource {

public:
  /**
   * @brief Constructs a DJAudioPlayer object with the given AudioFormatManager object.
   * 
   * @param _formatManager The AudioFormatManager object to be used for loading audio files.
   */
  DJAudioPlayer(AudioFormatManager &_formatManager);

  /**
   * @brief Destroys the DJAudioPlayer object.
   */
  ~DJAudioPlayer();

  /**
   * @brief Prepares the audio player for playback with the given number of samples per block and sample rate.
   * 
   * This function overrides the pure virtual function from the AudioSource class.
   * 
   * @param samplesPerBlockExpected The number of samples per block expected.
   * @param sampleRate The sample rate.
   */
  void prepareToPlay(int samplesPerBlockExpected, double sampleRate) override;

  /**
   * @brief Fills the given audio buffer with the next block of audio data.
   * 
   * This function overrides the pure virtual function from the AudioSource class.
   * 
   * @param bufferToFill The audio buffer to be filled.
   */
  void getNextAudioBlock(const AudioSourceChannelInfo &bufferToFill) override;

  /**
   * @brief Releases any resources used by the audio player.
   * 
   * This function overrides the pure virtual function from the AudioSource class.
   */
  void releaseResources() override;

  /**
   * @brief Loads the audio file from the given URL.
   * 
   * @param audioURL The URL of the audio file to be loaded.
   */
  void loadURL(URL audioURL);

  /**
   * @brief Sets the gain of the audio player.
   * 
   * @param gain The gain value.
   */
  void setGain(double gain);

  /**
   * @brief Sets the speed ratio of the audio player.
   * 
   * @param ratio The speed ratio value.
   */
  void setSpeed(double ratio);

  /**
   * @brief Sets the position of the playhead to the given time in seconds.
   * 
   * @param posInSecs The position in seconds.
   */
  void setPosition(double posInSecs);

  /**
   * @brief Sets the position of the playhead relative to the current position.
   * 
   * @param pos The relative position.
   */
  void setPositionRelative(double pos);

  /**
   * @brief Starts playback of the audio file.
   */
  void start();

  /**
   * @brief Stops playback of the audio file.
   */
  void stop();

  /**
   * @brief Determines if the audio player is currently playing.
   * 
   * @return true if the audio player is playing, false otherwise.
   */
  bool isPlaying();

  /**
   * @brief Determines if an audio file is loaded.
   */
  bool isLoaded = false;

  /**
   * @brief Returns the address of the transportSource object to be used for ChangeListener.
   * 
   * @return The address of the transportSource object.
   */
  AudioTransportSource *getTransportSource();

  /**
   * @brief Returns the relative position of the playhead.
   * 
   * @return The relative position of the playhead.
   */
  double getPositionRelative();

  /**
   * @brief The audio channel information object used for filling audio buffers.
   */
  AudioSourceChannelInfo channelInfo;

  /**
   * @brief The analyser model object used for analyzing audio data.
   */
  AnalyserModel analyserModel;

private:
  /**
   * @brief The AudioFormatManager object used for loading audio files.
   */
  AudioFormatManager &formatManager;

  /**
   * @brief The AudioFormatReaderSource object used for reading audio data from a file.
   */
  std::unique_ptr<AudioFormatReaderSource> readerSource;

  /**
   * @brief The AudioTransportSource object used for playing audio data.
   */
  AudioTransportSource transportSource;

  /**
   * @brief The ResamplingAudioSource object used for resampling audio data.
   */
  ResamplingAudioSource resampleSource{&transportSource, false, 2};
};
