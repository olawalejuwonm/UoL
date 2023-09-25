/*
  ==============================================================================

    PlaylistComponent.cpp
    Created: 13 Aug 2023 8:29:06pm
    Author:  Micheal

  ==============================================================================
*/

#include <JuceHeader.h>
#include "PlaylistComponent.h"

//==============================================================================
PlaylistComponent::PlaylistComponent(
    DeckGUI *_deck1,
    DeckGUI *_deck2) : deck1(_deck1), deck2(_deck2)
{
  // In your constructor, you should add any child components, and
  // initialise any special settings that your component needs.

  // Load the file URLs from the saved file, if it exists
  const File savedFileURLsFile(getSavedFileURLsFilePath());
  if (savedFileURLsFile.existsAsFile())
  {
    // Save the contents of the file to a string
    String savedFileURLsFileContents = savedFileURLsFile.loadFileAsString();
    // Split the string by newlines
    StringArray savedFileURLsFileLines;
    // function that splits a string by a delimiter
    savedFileURLsFileLines.addLines(savedFileURLsFileContents);
    // Loop through each line
    for (int i = 0; i < savedFileURLsFileLines.size(); i++)
    {
      // Get the file URL from the line
      URL fileURL(savedFileURLsFileLines[i]);
      std::cout << "fileURL here: " << fileURL.toString(true) << std::endl;
      fileURLs.set(i, fileURL);
      // String fileName = fileURL.getFileNameWithoutExtension();
      // get fileName from fileURL
      String fileName = fileURL.getLocalFile().getFileNameWithoutExtension();
      trackTitles.push_back(fileName.toStdString());
      // // Add the file URL to the fileURLs array
      // fileURLs.add(fileURL);
      // // Add the file name to the trackTitles array
      // trackTitles.push_back(fileURL.getLocalFile().getFileNameWithoutExtension().toStdString());
    }
    tableComponent.updateContent();
  }

  tableComponent.getHeader().addColumn("Track Title", 0, 400);
  tableComponent.getHeader().addColumn("Deck 1", 1, 200);
  tableComponent.getHeader().addColumn("Deck 2", 2, 200);
  tableComponent.setModel(this);
  addAndMakeVisible(tableComponent);
  tableComponent.setMultipleSelectionEnabled(true);

  searchBox = std::make_unique<TextEditor>();
  addAndMakeVisible(searchBox.get());
  searchBox->setMultiLine(false);
  searchBox->setReturnKeyStartsNewLine(false);
  searchBox->setReadOnly(false);
  searchBox->setScrollbarsShown(false);
  searchBox->setCaretVisible(true);
  searchBox->setPopupMenuEnabled(true);
  searchBox->setColour(TextEditor::backgroundColourId, Colours::white);
  searchBox->setColour(TextEditor::outlineColourId, Colours::grey);
  searchBox->setColour(TextEditor::focusedOutlineColourId, Colours::lightblue);
  searchBox->setColour(TextEditor::textColourId, Colours::black);
  searchBox->setColour(TextEditor::shadowColourId, Colours::transparentBlack);
  // This will set placeholder text
  searchBox->setTextToShowWhenEmpty("Search...", juce::Colours::grey);

  searchBox->addListener(this);
}

PlaylistComponent::~PlaylistComponent()
{
}

void PlaylistComponent::paint(juce::Graphics &g)
{
  /* This demo code just fills the component's background and
     draws some placeholder text to get you started.

     You should replace everything in this method with your own
     drawing code..
  */

  g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId)); // clear the background

  g.setColour(juce::Colours::grey);
  g.drawRect(getLocalBounds(), 1); // draw an outline around the component

  g.setColour(juce::Colours::white);
  g.setFont(14.0f);
  g.drawText("PlaylistComponent", getLocalBounds(),
             juce::Justification::centred, true); // draw some placeholder text
}

void PlaylistComponent::resized()
{
  // This method is where you should set the bounds of any child
  // components that your component contains..

  tableComponent.setBounds(0, 30, getWidth(), getHeight());
  searchBox->setBounds(0, 0, getWidth(), 30);
}

int PlaylistComponent::getNumRows()
{
  return trackTitles.size();
}

void PlaylistComponent::paintRowBackground(
    juce::Graphics &g,
    int /*rowNumber*/,
    int /*width*/,
    int height,
    bool rowIsSelected)
{
  if (rowIsSelected)
  {
    g.fillAll(juce::Colours::lightblue);
  }
  else
  {
    g.fillAll(juce::Colours::white);
  }
}

void PlaylistComponent::paintCell(
    juce::Graphics &g,
    int rowNumber,
    int columnId,
    int width,
    int height,
    bool rowIsSelected)
{

  g.setColour(juce::Colours::black);
  g.setFont(14.0f);

  if (columnId == 0)
  {
    g.drawText(trackTitles[rowNumber], 2, 0, width - 4, height, juce::Justification::centredLeft, true);
  }
  else if (columnId == 1)
  {
  }
}

Component *PlaylistComponent::refreshComponentForCell(
    int rowNumber,
    int columnId,
    bool isRowSelected,
    Component *existingComponentToUpdate)
{

  if (columnId == 1 || columnId == 2)
  {
    if (existingComponentToUpdate == nullptr)
    {
      TextButton *btn = new TextButton{"Load"};

      // save the button's component ID so we know which one was clicked later
      // a combination of the row number and column ID should be enough to uniquely identify it
      // double id = rowNumber + " " + columnId;
      std::stringstream ss;
      btn->setComponentID(String(ss.str()));

      // std ::cout << "id: " << id << std::endl;
      // btn->setComponentID(id);
      btn->addListener(this);
      existingComponentToUpdate = btn;
    }

    return existingComponentToUpdate;
  }
  else
  {
    return nullptr;
  }
}

void PlaylistComponent::buttonClicked(Button *button)
{
  std::cout << "button clicked" << std::endl;
  std::cout << "button id: " << button->getComponentID() << std::endl;
  // get column id and row number from button id
  int rowNumber = std::stoi(button->getComponentID().toStdString().substr(0, 1));
  int columnNumber = std::stoi(button->getComponentID().toStdString().substr(2, 1));
  std::cout << "rowNumber: " << rowNumber << std::endl;
  std::cout << "columnNumber: " << columnNumber << std::endl;

  // gets the fileUrl of the track with the given rowNumber
  URL fileURL = fileURLs[rowNumber];
  std::cout << "fileURL: " << fileURL.toString(true) << std::endl;
  if (columnNumber == 1)
  {
    std::cout << "player1" << std::endl;
    deck1->loadDJ(fileURL);
  }
  else if (columnNumber == 2)
  {
    std::cout << "player2" << std::endl;
    deck2->loadDJ(fileURL);
  }
}

void PlaylistComponent::textEditorTextChanged(TextEditor &editor)
{
  String searchText = editor.getText();
  // Perform search with searchText
  std::cout << "DeckGUI::textEditorTextChanged " << searchText << std::endl;
  // Filter filesURLs by searchText
  // Iterate through all the fileURLs
  // Clear trackTitles
  trackTitles.clear();
  for (int i = 0; i < fileURLs.size(); i++)
  {
    // Get the fileURL
    URL fileURL = fileURLs[i];
    // Get the file name
    String fileName = fileURL.getLocalFile().getFileNameWithoutExtension();
    // Check if the file name contains the searchText
    if (fileName.containsIgnoreCase(searchText))
    {
      // If it does, add it to the filteredFileURLs
      // filteredFileURLs.add(fileURL);
      // Add the file name to the trackTitles
      trackTitles.push_back(fileName.toStdString());
    }
  }

  tableComponent.updateContent();
}

bool PlaylistComponent::isInterestedInDragSource(const SourceDetails &dragSourceDetails)
{
  std::cout << "isInterestedInDragSource: " << dragSourceDetails.sourceComponent << std::endl;
  return true;
}

void PlaylistComponent::itemDropped(const SourceDetails &dragSourceDetails)
{
  std::cout << "itemDropped: " << dragSourceDetails.sourceComponent << std::endl;
}

void PlaylistComponent::itemDragEnter(const SourceDetails &dragSourceDetails)
{
  std::cout << "itemDragEnter: " << dragSourceDetails.sourceComponent << std::endl;
}

void PlaylistComponent::itemDragMove(const SourceDetails &dragSourceDetails)
{
  std::cout << "itemDragMove: " << dragSourceDetails.sourceComponent << std::endl;
}

void PlaylistComponent::itemDragExit(const SourceDetails &dragSourceDetails)
{
  std::cout << "itemDragExit: " << dragSourceDetails.sourceComponent << std::endl;
}

bool PlaylistComponent::isInterestedInFileDrag(const StringArray &files)
{
  return true;
}

void PlaylistComponent::filesDropped(const StringArray &files, int /*x*/, int /*y*/)
{
  // Clear all TrackTitles
  trackTitles.clear();
  for (int i = 0; i < files.size(); ++i)
  {
    const File file(files[i]);
    const URL fileURL(file);
    fileURLs.set(i, fileURL);
    // Add new TrackTitles
    String fileName = file.getFileNameWithoutExtension();
    trackTitles.push_back(fileName.toStdString());
  }

  tableComponent.updateContent();

  // Save the file URLs to a file
  const File savedFileURLsFile(getSavedFileURLsFilePath());
  FileOutputStream savedFileURLsStream(savedFileURLsFile);
  // Clear the file content first to avoid duplicates
  savedFileURLsStream.truncate();
  for (int i = 0; i < fileURLs.size(); i++)
  {
    savedFileURLsStream.writeText(fileURLs[i].toString(true) + "\n", false, false, "\n");
  }
}

String PlaylistComponent::getSavedFileURLsFilePath()
{
  // This create a data folder in the user's documents folder
  File folder = File::getSpecialLocation(File::userDocumentsDirectory).getChildFile("DJData");
  if (!folder.exists())
  {
    folder.createDirectory();
  }
  std::cout << "folder: " << folder.getFullPathName() << std::endl;
  return folder.getFullPathName() + "/savedFileURLsFile.txt";
}
