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

//==============================================================================
/*
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
  DeckGUI(DJAudioPlayer *player,
          AudioFormatManager &formatManagerToUse,
          AudioThumbnailCache &cacheToUse);
  ~DeckGUI();

  void paint(Graphics &) override;
  void resized() override;

  /** implement Button::Listener */
  void buttonClicked(Button *) override;

  /** implement Slider::Listener */
  void sliderValueChanged(Slider *slider) override;

  // MouseListener callback method
  // void mouseDoubleClick(const MouseEvent &event) override;
  void mouseDown(const MouseEvent &event) override;

  bool isInterestedInFileDrag(const StringArray &files) override;
  void filesDropped(const StringArray &files, int x, int y) override;

  void timerCallback() override;

  void changeListenerCallback(ChangeBroadcaster *source) override;

private:
  DrawableButton playButton{"PLAY", DrawableButton::ImageFitted};
  // TextButton stopButton{"STOP"};
  TextButton loadButton{"LOAD"};

  Slider volSlider;
  Slider speedSlider;
  Slider posSlider;

  // Svg play button icon
  DrawablePath playButtonIcon;

  // posSlider::setSliderStyle(juce::Slider::RotaryHorizontalDrag, juce::Slider::NoTextBox);

  FileChooser fChooser{"Select a file..."};

  /** Load the file from the URL **/
  void loadFile();

  WaveformDisplay waveformDisplay;

  DJAudioPlayer *player;

  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(DeckGUI)
};
