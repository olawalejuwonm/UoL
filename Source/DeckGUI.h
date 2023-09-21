/*
  ==============================================================================

    DeckGUI.h
    Created: 13 Mar 2020 6:44:48pm
    Author:  matthew

  ==============================================================================
*/

#pragma once

#include "../JuceLibraryCode/JuceHeader.h"
#include "DJAudioPlayer.h"
#include "WaveformDisplay.h"
#include "AnalyserModel.h"

//==============================================================================
/*
 */
/**
 * @class DeckGUI
 * @brief A GUI class for a DJ deck.
 *
 * This class provides a graphical user interface for a DJ deck. It contains methods for drawing the turntable, handling button and slider events, and loading and playing audio files. It also includes a waveform display and an equalizer.
 */
class DeckGUI : public Component,
                public Button::Listener,
                public Slider::Listener,
                public MouseListener,
                // Add listener for drawable
                public ChangeListener,
                // public DrawableButton::Listener,
                public FileDragAndDropTarget,
                public Timer
{
public:
  /**
   * @brief Constructor for DeckGUI.
   *
   * @param player A pointer to the DJAudioPlayer object.
   * @param formatManagerToUse A reference to the AudioFormatManager object to use.
   * @param cacheToUse A reference to the AudioThumbnailCache object to use.
   */
  DeckGUI(DJAudioPlayer *player,
          AudioFormatManager &formatManagerToUse,
          AudioThumbnailCache &cacheToUse);

  /**
   * @brief Destructor for DeckGUI.
   */
  ~DeckGUI();

  /**
   * @brief Draws the turntable.
   *
   * @param g The Graphics object to use for drawing.
   * @param x The x-coordinate of the turntable.
   * @param curve The amount of curve to apply to the turntable.
   */
  void drawTurnTable(Graphics &g, int x, int curve);

  /**
   * @brief Paints the component.
   *
   * @param g The Graphics object to use for painting.
   */
  void paint(Graphics &) override;

  /**
   * @brief Called when the component is resized.
   */
  void resized() override;

  /**
   * @brief Called when a button is clicked.
   *
   * @param button The button that was clicked.
   */
  void buttonClicked(Button *) override;

  /**
   * @brief Called when a slider value is changed.
   *
   * @param slider The slider that was changed.
   */
  void sliderValueChanged(Slider *slider) override;

  /**
   * @brief Called when the mouse is pressed.
   *
   * @param event The MouseEvent that occurred.
   */
  void mouseDown(const MouseEvent &event) override;

  /**
   * @brief Returns whether the component is interested in a file drag.
   *
   * @param files The list of files being dragged.
   * @return true if the component is interested in the file drag, false otherwise.
   */
  bool isInterestedInFileDrag(const StringArray &files) override;

  /**
   * @brief Called when files are dropped onto the component.
   *
   * @param files The list of files that were dropped.
   * @param x The x-coordinate of the drop location.
   * @param y The y-coordinate of the drop location.
   */
  void filesDropped(const StringArray &files, int x, int y) override;

  /**
   * @brief Called when the timer fires.
   */
  void timerCallback() override;

  /**
   * @brief Called when a change is broadcasted.
   *
   * @param source The ChangeBroadcaster that broadcasted the change.
   */
  void changeListenerCallback(ChangeBroadcaster *source) override;

  /**
   * @brief Loads an audio file from a URL.
   *
   * @param audioURL The URL of the audio file to load.
   */
  void loadDJ(URL audioURL);

private:
  DrawableButton playButton{"PLAY", DrawableButton::ImageFitted};
  Slider volSlider;
  Slider speedSlider;
  Slider posSlider;
  DrawablePath playStopButtonIcon;
  juce::ToggleButton loopToggle;
  FileChooser fChooser{"Select a file..."};

  /** Load the file from the URL **/
  void loadFile();

  /** Should player loop? **/
  bool loop = false;
  WaveformDisplay waveformDisplay;
  DJAudioPlayer *player;

  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(DeckGUI)
};
