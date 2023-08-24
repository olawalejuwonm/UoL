/*
  ==============================================================================

    PlaylistComponent.h
    Created: 13 Aug 2023 8:29:06pm
    Author:  USER

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>
#include <vector>
#include <string>
using namespace juce;
//==============================================================================
/*
 */
class PlaylistComponent : public juce::Component,
                          public juce::TableListBoxModel,
                          public Button::Listener,
                          public TextEditor::Listener
{
public:
  PlaylistComponent();
  ~PlaylistComponent() override;

  void paint(juce::Graphics &) override;
  void resized() override;

  int getNumRows() override;

  void paintRowBackground(
      juce::Graphics &g,
      int rowNumber,
      int width,
      int height,
      bool rowIsSelected) override;

  void paintCell(
      juce::Graphics &g,
      int rowNumber,
      int columnId,
      int width,
      int height,
      bool rowIsSelected) override;

  Component *refreshComponentForCell(
      int rowNumber,
      int columnId,
      bool isRowSelected,
      Component *existingComponentToUpdate) override;

  void buttonClicked(Button *button) override;

  void textEditorTextChanged(TextEditor &editor) override;

private:
  TableListBox tableComponent;
  std::vector<std::string> trackTitles;

  std::unique_ptr<TextEditor> searchBox;
  std::unique_ptr<Viewport> viewport;

  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(PlaylistComponent)
};
