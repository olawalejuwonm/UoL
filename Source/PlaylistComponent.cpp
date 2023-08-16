/*
  ==============================================================================

    PlaylistComponent.cpp
    Created: 13 Aug 2023 8:29:06pm
    Author:  USER

  ==============================================================================
*/

#include <JuceHeader.h>
#include "PlaylistComponent.h"

//==============================================================================
PlaylistComponent::PlaylistComponent()
{
  // In your constructor, you should add any child components, and
  // initialise any special settings that your component needs.
  trackTitles.push_back("Track 1");
  trackTitles.push_back("Track 2");
  trackTitles.push_back("Track 3");
  trackTitles.push_back("Track 4");
  trackTitles.push_back("Track 5");
  trackTitles.push_back("Track 6");

  tableComponent.getHeader().addColumn("Track Title", 0, 400);
  tableComponent.getHeader().addColumn("", 1, 400);
  tableComponent.setModel(this);
  addAndMakeVisible(tableComponent);
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

  tableComponent.setBounds(0, 0, getWidth(), getHeight());
}

int PlaylistComponent::getNumRows()
{
  return trackTitles.size();
}

void PlaylistComponent::paintRowBackground(
    juce::Graphics &g,
    int rowNumber,
    int width,
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
  // std::cout << "paintCell called" << std::endl;
  // std::cout << "rowNumber: " << rowNumber << std::endl;
  // g.drawText(trackTitles[rowNumber], 2, 0, width - 4, height, juce::Justification::centredLeft, true);

  g.setColour(juce::Colours::black);
  g.setFont(14.0f);

  if (columnId == 0)
  {
    g.drawText(trackTitles[rowNumber], 2, 0, width - 4, height, juce::Justification::centredLeft, true);
  }
  else if (columnId == 1)
  {
    g.drawText("Artist", 2, 0, width - 4, height, juce::Justification::centredLeft, true);
  }
}

Component *PlaylistComponent::refreshComponentForCell(
    int rowNumber,
    int columnId,
    bool isRowSelected,
    Component *existingComponentToUpdate)
{

  if (columnId == 1)
  {
    if (existingComponentToUpdate == nullptr)
    {
      TextButton* btn = new TextButton{"Play"};
      String id(std::to_string(rowNumber));
      btn->setComponentID(id);
      btn->addListener(this);
      existingComponentToUpdate = btn;
    }
    // juce::TextButton *artistButton = static_cast<juce::TextButton *>(existingComponentToUpdate);

    // if (!artistButton)
    // {
    //   artistButton = new juce::TextButton();
    //   artistButton->setButtonText("Artist");
    //   artistButton->setColour(juce::TextButton::buttonColourId, juce::Colours::white);
    //   artistButton->setColour(juce::TextButton::buttonOnColourId, juce::Colours::lightblue);
    //   artistButton->setColour(juce::TextButton::textColourOnId, juce::Colours::black);
    //   artistButton->setColour(juce::TextButton::textColourOffId, juce::Colours::black);
    //   artistButton->setConnectedEdges(juce::Button::ConnectedOnLeft | juce::Button::ConnectedOnRight | juce::Button::ConnectedOnTop | juce::Button::ConnectedOnBottom);
    //   artistButton->addListener(this);
    // }

    // return artistButton;
    return existingComponentToUpdate;
  }
  else
  {
    return nullptr;
  }
}

void PlaylistComponent::buttonClicked(Button* button)
{
  std::cout << "button clicked" << std::endl;
  std::cout << "button id: " << button->getComponentID().getIntValue() << std::endl;
  int id = std::stoi(button->getComponentID().toStdString());
}

