/*
  ==============================================================================

    DJAudioPlayer.h
    Created: 13 Mar 2020 4:22:22pm
    Author:  matthew

  ==============================================================================
*/

#pragma once

#include "../JuceLibraryCode/JuceHeader.h"
#include "AnalyserModel.h"


using namespace juce;



// class AnalyserModel;

class DJAudioPlayer : public AudioSource
{
public:
  DJAudioPlayer(AudioFormatManager &_formatManager);
  ~DJAudioPlayer();

  void prepareToPlay(int samplesPerBlockExpected, double sampleRate) override;
  void getNextAudioBlock(const AudioSourceChannelInfo &bufferToFill) override;
  void releaseResources() override;

  void loadURL(URL audioURL);
  void setGain(double gain);
  void setSpeed(double ratio);
  void setPosition(double posInSecs);
  void setPositionRelative(double pos);

  void start();
  void stop();

  /** Determine if the player is currently playing */
  bool isPlaying();

  /** Determine if allowed file is loaded */
  bool isLoaded = false;

  /** get the address of the transportSource to be used for ChangeListener */
  AudioTransportSource *getTransportSource();

  /** get the relative position of the playhead */
  double getPositionRelative();

  AudioSourceChannelInfo channelInfo;

  AnalyserModel analyserModel;

private:
  AudioFormatManager &formatManager;
  std::unique_ptr<AudioFormatReaderSource> readerSource;
  AudioTransportSource transportSource;
  ResamplingAudioSource resampleSource{&transportSource, false, 2};
};
