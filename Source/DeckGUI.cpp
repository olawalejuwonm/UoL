/*
  ==============================================================================

    DeckGUI.cpp
    Created: 13 Mar 2020 6:44:48pm
    Author:  matthew

  ==============================================================================
*/

#include "../JuceLibraryCode/JuceHeader.h"
#include "DeckGUI.h"

using namespace juce;

//==============================================================================
DeckGUI::DeckGUI(DJAudioPlayer *_player,
                 AudioFormatManager &formatManagerToUse,
                 AudioThumbnailCache &cacheToUse) : player(_player),
                                                    waveformDisplay(formatManagerToUse, cacheToUse)
{

    addAndMakeVisible(playButton);
    addAndMakeVisible(stopButton);
    addAndMakeVisible(loadButton);

    addAndMakeVisible(volSlider);
    addAndMakeVisible(speedSlider);
    addAndMakeVisible(posSlider);

    addAndMakeVisible(waveformDisplay);

    playButton.addListener(this);
    stopButton.addListener(this);
    loadButton.addListener(this);

    volSlider.addListener(this);
    speedSlider.addListener(this);
    posSlider.addListener(this);

    volSlider.setRange(0.0, 1.0);
    speedSlider.setRange(0.1, 100.0);
    posSlider.setRange(0.0, 1.0);

    // This sets the style of the slider to a rotary knob 
    // https://docs.juce.com/master/classSlider.html#af1caee82552143dd9ff0fc9f0cdc0888
    posSlider.setSliderStyle(juce::Slider::RotaryHorizontalVerticalDrag);
    posSlider.setTextBoxStyle(juce::Slider::NoTextBox, true, 0, 0);

    volSlider.setSliderStyle(juce::Slider::LinearHorizontal);

    
    speedSlider.setSliderStyle(juce::Slider::LinearHorizontal);

    // This sets the color of the waveform
    waveformDisplay.setColour(WaveformDisplay::waveformColourId, Colours::red);



    startTimer(500);
}

DeckGUI::~DeckGUI()
{
    stopTimer();
}

void DeckGUI::paint(Graphics &g)
{
    g.fillAll(Colours::black); // clear the background

    // Draw the turntable
    g.setColour(Colours::grey);
    g.fillEllipse(50, 50, 300, 300);
    g.setColour(Colours::white);
    g.drawEllipse(50, 50, 300, 300, 5);

    // Draw the tonearm
    g.setColour(Colours::grey);
    g.fillRect(200, 100, 10, 150);
    g.setColour(Colours::white);
    g.drawRect(200, 100, 10, 150, 5);

    // Draw the needle
    g.setColour(Colours::red);
    g.fillRect(205, 250, 1, 5);

    // Draw the waveform
    g.setColour(Colours::white);
    Path waveformPath;
    waveformPath.startNewSubPath(400, 200);
    waveformPath.lineTo(450, 150);
    waveformPath.lineTo(500, 250);
    waveformPath.lineTo(550, 200);
    waveformPath.lineTo(600, 150);
    waveformPath.lineTo(650, 250);
    waveformPath.lineTo(700, 200);
    g.strokePath(waveformPath, PathStrokeType(2.0f));
}

void DeckGUI::resized()
{
    int rowH = getHeight() / 8;
    playButton.setBounds(0, 0, getWidth(), rowH);
    stopButton.setBounds(0, rowH, getWidth(), rowH);
    volSlider.setBounds(0, rowH * 2, getWidth(), rowH);
    speedSlider.setBounds(0, rowH * 3, getWidth(), rowH);
    // posSlider.setBounds(0, rowH * 4, getWidth(), rowH);
    std::cout << "DeckGUI::resized" << getWidth() << "rowH" << rowH << std::endl;
    posSlider.setBounds(0, rowH * 4, getWidth(), rowH+100);

    waveformDisplay.setBounds(0, rowH * 5, getWidth(), rowH * 2);
    loadButton.setBounds(0, rowH * 7, getWidth(), rowH);
}

void DeckGUI::buttonClicked(Button *button)
{
    if (button == &playButton)
    {
        std::cout << "Play button was clicked " << std::endl;
        player->start();
    }
    if (button == &stopButton)
    {
        std::cout << "Stop button was clicked " << std::endl;
        player->stop();
    }
    if (button == &loadButton)
    {
        // this does work in 6.1 but the syntax is a little funky
        // https://docs.juce.com/master/classFileChooser.html#ac888983e4abdd8401ba7d6124ae64ff3
        // - configure the dialogue
        auto fileChooserFlags =
            FileBrowserComponent::canSelectFiles;
        // - launch out of the main thread
        // - note how we use a lambda function which you've probably
        // not seen before. Please do not worry too much about that.
        fChooser.launchAsync(fileChooserFlags, [this](const FileChooser &chooser)
                             {
            File chosenFile = chooser.getResult();
            player->loadURL(URL{chosenFile});
            // player->loadURL(URL{chooser.getResult()});
            // and now the waveformDisplay as well
            waveformDisplay.loadURL(URL{chooser.getResult()}); });
    }
    // if (button == &loadButton)
    // {
    //     FileChooser chooser{"Select a file..."};
    //     if (chooser.browseForFileToOpen())
    //     {
    //         player->loadURL(URL{chooser.getResult()});
    //         waveformDisplay.loadURL(URL{chooser.getResult()});

    //     }

    // }
}

void DeckGUI::sliderValueChanged(Slider *slider)
{
    if (slider == &volSlider)
    {
        player->setGain(slider->getValue());
    }

    if (slider == &speedSlider)
    {
        player->setSpeed(slider->getValue());
    }

    if (slider == &posSlider)
    {
        player->setPositionRelative(slider->getValue());
    }
}

bool DeckGUI::isInterestedInFileDrag(const StringArray &files)
{
    std::cout << "DeckGUI::isInterestedInFileDrag" << std::endl;
    return true;
}

// void DeckGUI::filesDropped(const StringArray &files, int x, int y)
// {
//     std::cout << "DeckGUI::filesDropped" << std::endl;
//     std::cout << "x: " << x << " y: " << y << std::endl;
//     if (files.size() == 1)
//     {
//         // player->loadURL(URL{chosenFile});

//         // player->loadURL(URL{File{files[0]}});
//         player->loadURL(URL{File{files[0]}});
//     }
// }

void DeckGUI::filesDropped(const juce::StringArray &files, int x, int y)
{
    std::cout << "DeckGUI::filesDropped" << std::endl;

    for (const auto &filename : files)
    {
        std::cout << "DeckGUI::filesNames" << filename << std::endl;
        // This will convert the filename to a URL of file://
        player->loadURL(juce::URL{juce::File{filename}});
        waveformDisplay.loadURL(juce::URL{juce::File{filename}});
    }
}

void DeckGUI::timerCallback()
{
    // std::cout << "DeckGUI::timerCallback" << std::endl;
    waveformDisplay.setPositionRelative(
        player->getPositionRelative());
}
