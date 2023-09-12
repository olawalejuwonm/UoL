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
#include "DeckGUI.h"
using namespace juce;
//==============================================================================
/*
 */
class PlaylistComponent : public juce::Component,
                          public juce::TableListBoxModel,
                          public Button::Listener,
                          public TextEditor::Listener,
                          public MouseListener,
                          public DragAndDropTarget,
                          public FileDragAndDropTarget

{
public:
  PlaylistComponent(DeckGUI *deck1, DeckGUI *deck2);
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

  bool isInterestedInDragSource(const SourceDetails &dragSourceDetails) override;

  void itemDropped(const SourceDetails &dragSourceDetails) override;

  void itemDragEnter(const SourceDetails &dragSourceDetails) override;

  void itemDragMove(const SourceDetails &dragSourceDetails) override;

  void itemDragExit(const SourceDetails &dragSourceDetails) override;

  bool isInterestedInFileDrag(const StringArray &files) override;
  void filesDropped(const StringArray &files, int x, int y) override;

private:
  TableListBox tableComponent;
  DragAndDropContainer *container;
  std::vector<std::string> trackTitles;

  HashMap<int, URL> fileURLs;

  std::unique_ptr<TextEditor> searchBox;
  std::unique_ptr<Viewport> viewport;

  DeckGUI *deck1;

  DeckGUI *deck2;

  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(PlaylistComponent)
};
