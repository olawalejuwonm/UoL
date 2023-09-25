/*
  ==============================================================================

    WaveformDisplay.h
    Created: 15 Aug 2023 4:20:13pm
    Author:  Micheal

  ==============================================================================
*/

#pragma once

#include "../JuceLibraryCode/JuceHeader.h"

using namespace juce;


//==============================================================================
/*
*/
class WaveformDisplay    : public Component, 
                           public ChangeListener
/**
 * @class WaveformDisplay
 * @brief A class that displays an audio waveform.
 * 
 * This class inherits from the JUCE Component class and implements the ChangeListener interface.
 * It displays an audio waveform using an AudioThumbnail object.
 */
{
public:
  /**
   * @brief Constructor for WaveformDisplay.
   * 
   * @param formatManagerToUse An AudioFormatManager object to use for loading audio files.
   * @param cacheToUse An AudioThumbnailCache object to use for caching audio thumbnails.
   */
  WaveformDisplay( AudioFormatManager & 	formatManagerToUse,
          AudioThumbnailCache & 	cacheToUse );
  
  /**
   * @brief Destructor for WaveformDisplay.
   */
  ~WaveformDisplay();

  /**
   * @brief Paints the component.
   * 
   * @param g A Graphics object to use for painting.
   */
  void paint (Graphics&) override;
  
  /**
   * @brief Called when the component is resized.
   */
  void resized() override;

  /**
   * @brief Called when a change occurs in a ChangeBroadcaster object.
   * 
   * @param source A pointer to the ChangeBroadcaster object that triggered the change.
   */
  void changeListenerCallback (ChangeBroadcaster *source) override;

  /**
   * @brief Loads an audio file from a URL.
   * 
   * @param audioURL The URL of the audio file to load.
   */
  void loadURL(URL audioURL);

  /**
   * @brief Sets the relative position of the playhead.
   * 
   * @param pos The relative position of the playhead, between 0.0 and 1.0.
   */
  void setPositionRelative(double pos);

  /**
   * @brief The ID of the waveform color.
   */
  static const int waveformColourId = 0x1005600;

private:
  AudioThumbnail audioThumb; /**< The AudioThumbnail object used for displaying the waveform. */
  bool fileLoaded; /**< A boolean indicating whether an audio file has been loaded. */
  double position; /**< The relative position of the playhead. */
  
  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (WaveformDisplay)
};
