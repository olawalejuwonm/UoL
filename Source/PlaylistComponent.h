/*
  ==============================================================================

    PlaylistComponent.h
    Created: 13 Aug 2023 8:29:06pm
    Author:  Micheal

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

/**
 * @class PlaylistComponent
 * @brief A component that displays a playlist of tracks with drag-and-drop functionality.
 *
 * The PlaylistComponent class inherits from Component and implements various methods for painting, resizing,
 * handling button clicks and text editor changes, and drag-and-drop events. It also contains a TableListBox
 * component for displaying the playlist, as well as two DeckGUI pointers for handling drag-and-drop events.
 * The class also has a HashMap for storing file URLs and a search box for filtering the playlist.
 */
/**
 * @class PlaylistComponent
 * @brief A component that displays a playlist of tracks and allows the user to interact with it.
 * 
 * This class inherits from TableListBoxModel and Button::Listener, and implements several other
 * listener interfaces to handle user interaction with the playlist. It contains a TableListBox
 * component to display the playlist, and two DeckGUI pointers to control the audio playback.
 * 
 * @see TableListBoxModel, Button::Listener, DragAndDropContainer, TextEditor::Listener,
 *      DragAndDropTarget
 */

{
public:
  /**
   * @brief Constructs a PlaylistComponent object.
   * 
   * @param deck1 A pointer to the first DeckGUI object.
   * @param deck2 A pointer to the second DeckGUI object.
   */
  PlaylistComponent(DeckGUI *deck1, DeckGUI *deck2);

  /**
   * @brief Destroys the PlaylistComponent object.
   */
  ~PlaylistComponent() override;

  /**
   * @brief Paints the component.
   * 
   * @param g The Graphics context to use for painting.
   */
  void paint(juce::Graphics &) override;

  /**
   * @brief Resizes the component.
   */
  void resized() override;

  /**
   * @brief Gets the number of rows in the playlist.
   * 
   * @return The number of rows in the playlist.
   */
  int getNumRows() override;

  /**
   * @brief Paints the background of a row in the playlist.
   * 
   * @param g The Graphics context to use for painting.
   * @param rowNumber The index of the row to paint.
   * @param width The width of the row.
   * @param height The height of the row.
   * @param rowIsSelected Whether the row is currently selected.
   */
  void paintRowBackground(
      juce::Graphics &g,
      int rowNumber,
      int width,
      int height,
      bool rowIsSelected) override;

  /**
   * @brief Paints a cell in the playlist.
   * 
   * @param g The Graphics context to use for painting.
   * @param rowNumber The index of the row containing the cell to paint.
   * @param columnId The ID of the column containing the cell to paint.
   * @param width The width of the cell.
   * @param height The height of the cell.
   * @param rowIsSelected Whether the row containing the cell is currently selected.
   */
  void paintCell(
      juce::Graphics &g,
      int rowNumber,
      int columnId,
      int width,
      int height,
      bool rowIsSelected) override;

  /**
   * @brief Gets a component to display in a cell of the playlist.
   * 
   * @param rowNumber The index of the row containing the cell.
   * @param columnId The ID of the column containing the cell.
   * @param isRowSelected Whether the row containing the cell is currently selected.
   * @param existingComponentToUpdate A pointer to an existing component to update, or nullptr.
   * @return A pointer to the component to display in the cell.
   */
  Component *refreshComponentForCell(
      int rowNumber,
      int columnId,
      bool isRowSelected,
      Component *existingComponentToUpdate) override;

  /**
   * @brief Handles a button click event.
   * 
   * @param button A pointer to the button that was clicked.
   */
  void buttonClicked(Button *button) override;

  /**
   * @brief Handles a text editor text changed event.
   * 
   * @param editor The TextEditor that triggered the event.
   */
  void textEditorTextChanged(TextEditor &editor) override;

  /**
   * @brief Determines whether the component is interested in a drag source.
   * 
   * @param dragSourceDetails The details of the drag source.
   * @return true if the component is interested in the drag source, false otherwise.
   */
  bool isInterestedInDragSource(const SourceDetails &dragSourceDetails) override;

  /**
   * @brief Handles an item being dropped onto the component.
   * 
   * @param dragSourceDetails The details of the drag source.
   */
  void itemDropped(const SourceDetails &dragSourceDetails) override;

  /**
   * @brief Handles an item being dragged onto the component.
   * 
   * @param dragSourceDetails The details of the drag source.
   */
  void itemDragEnter(const SourceDetails &dragSourceDetails) override;

  /**
   * @brief Handles an item being dragged over the component.
   * 
   * @param dragSourceDetails The details of the drag source.
   */
  void itemDragMove(const SourceDetails &dragSourceDetails) override;

  /**
   * @brief Handles an item being dragged away from the component.
   * 
   * @param dragSourceDetails The details of the drag source.
   */
  void itemDragExit(const SourceDetails &dragSourceDetails) override;

  /**
   * @brief Determines whether the component is interested in a file drag.
   * 
   * @param files The list of files being dragged.
   * @return true if the component is interested in the file drag, false otherwise.
   */
  bool isInterestedInFileDrag(const StringArray &files) override;

  /**
   * @brief Handles files being dropped onto the component.
   * 
   * @param files The list of files being dropped.
   * @param x The x-coordinate of the drop location.
   * @param y The y-coordinate of the drop location.
   */
  void filesDropped(const StringArray &files, int x, int y) override;

private:
  TableListBox tableComponent; /**< The TableListBox component used to display the playlist. */
  DragAndDropContainer *container; /**< The DragAndDropContainer used to handle drag-and-drop events. */
  std::vector<std::string> trackTitles; /**< A vector of track titles to display in the playlist. */
  HashMap<int, URL> fileURLs; /**< A HashMap of file URLs for each track in the playlist. */
  std::unique_ptr<TextEditor> searchBox; /**< A TextEditor used to search the playlist. */
  std::unique_ptr<Viewport> viewport; /**< A Viewport used to display the TableListBox component. */
  DeckGUI *deck1; /**< A pointer to the first DeckGUI object. */
  DeckGUI *deck2; /**< A pointer to the second DeckGUI object. */

  /**
   * @brief Gets the file path for the saved file URLs.
   * 
   * @return The file path for the saved file URLs.
   */
  String getSavedFileURLsFilePath();

  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(PlaylistComponent) /**< Macro to declare the class as non-copyable and add a leak detector. */
};
