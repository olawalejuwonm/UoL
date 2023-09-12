/*
==============================================================================

DJAudioPlayer.cpp
Created: 13 Mar 2020 4:22:22pm
Author:  matthew

==============================================================================
*/

#include "DJAudioPlayer.h"
#include "AnalyserModel.h"

using namespace juce;


DJAudioPlayer::DJAudioPlayer(AudioFormatManager &_formatManager, AnalyserModel _analyserModel)
    : formatManager(_formatManager)
{
    // let local analyserModel point to the analyserModel passed in without initialising
    analyserModel = _analyserModel;
}
DJAudioPlayer::~DJAudioPlayer()
{
}

void DJAudioPlayer::prepareToPlay(int samplesPerBlockExpected, double sampleRate)
{
    transportSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
    resampleSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
}
void DJAudioPlayer::getNextAudioBlock(const AudioSourceChannelInfo &bufferToFill)
{
    resampleSource.getNextAudioBlock(bufferToFill);
    // Set the channelInfo to the bufferToFill
    channelInfo = bufferToFill;

    analyserModel->analyserController.pushSamplesIntoFifo(bufferToFill);
}
void DJAudioPlayer::releaseResources()
{
    transportSource.releaseResources();
    resampleSource.releaseResources();
}

void DJAudioPlayer::loadURL(URL audioURL)
{
    // auto *reader = formatManager.createReaderFor(audioURL.createInputStream(false));
    auto *reader = this->formatManager.createReaderFor(audioURL.createInputStream(
        URL::InputStreamOptions{URL::ParameterHandling::inAddress}));
    if (reader != nullptr) // good file!
    {
        std::unique_ptr<AudioFormatReaderSource> newSource(new AudioFormatReaderSource(reader,
                                                                                       true));
        transportSource.setSource(newSource.get(), 0, nullptr, reader->sampleRate);
        readerSource.reset(newSource.release());
        // Set the isLoaded flag to true
        isLoaded = true;
    }
}
void DJAudioPlayer::setGain(double gain)
{
    if (gain < 0 || gain > 1)
    {
        std::cout << "DJAudioPlayer::setGain gain should be between 0 and 1" << std::endl;
    }
    else
    {
        transportSource.setGain(gain);
    }
}
void DJAudioPlayer::setSpeed(double ratio)
{
    if (ratio < 0 || ratio > 100.0)
    {
        std::cout << "DJAudioPlayer::setSpeed ratio should be between 0 and 100" << std::endl;
    }
    else
    {
        resampleSource.setResamplingRatio(ratio);
    }
}
void DJAudioPlayer::setPosition(double posInSecs)
{
    transportSource.setPosition(posInSecs);
}

void DJAudioPlayer::setPositionRelative(double pos)
{
    if (pos < 0 || pos > 1.0)
    {
        std::cout << "DJAudioPlayer::setPositionRelative pos should be between 0 and 1" << std::endl;
    }
    else
    {
        double posInSecs = transportSource.getLengthInSeconds() * pos;
        setPosition(posInSecs);
    }
}

void DJAudioPlayer::start()
{
    // Check if the transport source can be played
    if (transportSource.hasStreamFinished())
    {
        transportSource.setPosition(0);
        std::cout << "DJAudioPlayer::start() - transportSource hasStreamFinished" << std::endl;
    }
    transportSource.start();
}
void DJAudioPlayer::stop()
{
    transportSource.stop();
}

// This will determine if the transport source is playing
bool DJAudioPlayer::isPlaying()
{
    return transportSource.isPlaying();
}

AudioTransportSource *DJAudioPlayer::getTransportSource()
{
    return &transportSource;
}

double DJAudioPlayer::getPositionRelative()
{
    return transportSource.getCurrentPosition() / transportSource.getLengthInSeconds();
}