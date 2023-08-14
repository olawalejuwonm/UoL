/*
  ==============================================================================

    PlaylistComponent.h
    Created: 15 Aug 2022 11:23:06am
    Author:  MOHAMMED BASHMAN

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>
#include <vector>
#include <string>
#include "DeckGUI.h"
#include "WaveformDisplay.h"
#include <fstream>

using namespace juce;

//==============================================================================
//The playlistComponent that inherits from Component, TableListBoxModel, Button Listener and File drag&drop classes
class PlaylistComponent  : public juce::Component,
                           public TableListBoxModel,
                           public Button::Listener,
                           public FileDragAndDropTarget
                           
{
public:
    //Constructor for PlaylistComponent with relevant arguments
    PlaylistComponent(DJAudioPlayer* _player1, DJAudioPlayer* _player2,
        AudioFormatManager& formatManagerToUse, 
        WaveformDisplay* _waveformDisplay1,WaveformDisplay* _waveformDisplay2);
    //PlaylistComponent();
    ~PlaylistComponent() override;

    //functions needed as this is a component class
    void paint (juce::Graphics&) override;
    void resized() override;

    //implementation of the below 3 functions since we inherit from TableListBoxModel as they are pure virtual functions
    int getNumRows() override;
    void paintRowBackground(Graphics&, int rowNumber,
        int width, int height, bool rowIsSelected) override;

    void paintCell(Graphics&, int rowNumber,
        int columnId, int width, int height,
        bool rowIsSelected) override;

    //Function used since we attach another component to a cell in the playlist TableListBox
    Component* refreshComponentForCell(int rowNumber,
        int columnId, bool isRowSelected,
        Component* existingComponentToUpdate) override;

    //Needs to be implemented since we inherit from Button::Listener class
    void buttonClicked(Button* button) override;

    bool isInterestedInFileDrag(const StringArray& files) override;
    void filesDropped(const StringArray& files, int x, int y) override;
    void loadURL(URL audioURL);
    std::vector<std::string> tokenise(std::string Line, char separator);
    void loading();
private:
    juce::TableListBox tableComponent;
    juce::TextEditor searchingTextBox;

    std::vector<juce::String> trackTitlesNames;//file's name
    std::vector<URL> trackTitles;//the files' URL
    std::vector<int> trackLengths;

    TextButton saveButton{ "Save List" };
    TextButton loadButton{ "Read List" };

    juce::String urljuce;
    std::string urlstd;
    std::string filenamestd;
    std::ofstream playlistSave;

    // pointers of type DJAudioPlayers
    DJAudioPlayer* player1;
    DJAudioPlayer* player2;
    WaveformDisplay* waveformDisplay1;
    WaveformDisplay* waveformDisplay2;
    //AudioTransportSource transportSource;
    //AudioFormatManager formatManagerToUse;
    //std::unique_ptr<juce::AudioFormatReaderSource> readerSource;

    SafePointer<DialogWindow> dialogWindow;

    void searching(String inputtext);
    void illustration();

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (PlaylistComponent)
};
