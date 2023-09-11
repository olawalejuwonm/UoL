/*
  ==============================================================================

    DeckGUI.cpp
    Created: 13 Mar 2020 6:44:48pm
    Author:  matthew

  ==============================================================================
*/
// Create a Spectrum Analyzer that analyze the audio playing
// https://docs.juce.com/master/tutorial_spectrum_analyser.html

#include "../JuceLibraryCode/JuceHeader.h"
#include "DeckGUI.h"

using namespace juce;

//==============================================================================
DeckGUI::DeckGUI(DJAudioPlayer *_player,
                 AudioFormatManager &formatManagerToUse,
                 AudioThumbnailCache &cacheToUse) : player(_player),
                                                    waveformDisplay(formatManagerToUse, cacheToUse),
                                                    eq(player)

{
    addAndMakeVisible(playButton);

    // addAndMakeVisible(loadButton);

    addAndMakeVisible(volSlider);
    addAndMakeVisible(speedSlider);
    addAndMakeVisible(posSlider);

    addAndMakeVisible(waveformDisplay);


    // addAndMakeVisible(eq);
    addAndMakeVisible(analyser);

    // addAndMakeVisible(playStopButtonIcon);

    // playButton.addListener(this);
    // stopButton.addListener(this);
    // loadButton.addListener(this);

    volSlider.addListener(this);
    speedSlider.addListener(this);
    posSlider.addListener(this);

    volSlider.setRange(0.0, 1.0);
    speedSlider.setRange(0.1, 100.0);
    posSlider.setRange(0.0, 1.0);

    playButton.addMouseListener(this, false);

    // This sets the style of the slider to a rotary knob
    // https://docs.juce.com/master/classSlider.html#af1caee82552143dd9ff0fc9f0cdc0888
    posSlider.setSliderStyle(juce::Slider::RotaryHorizontalVerticalDrag);
    // setTextBoxStyle removes the input text box from the slider
    posSlider.setTextBoxStyle(juce::Slider::NoTextBox, true, 0, 0);

    volSlider.setSliderStyle(juce::Slider::RotaryHorizontalDrag);
    volSlider.setTextBoxStyle(juce::Slider::NoTextBox, true, 0, 0);

    speedSlider.setSliderStyle(juce::Slider::RotaryVerticalDrag);
    speedSlider.setTextBoxStyle(juce::Slider::NoTextBox, true, 0, 0);

    // This aligns the slider to the centre of the knob
    // It makes the slider look like an enclosed circle(oval) rather than a ring
    // Reference: https://docs.juce.com/master/classSlider.html#a8f6f6f9c9b0e9e8f1c1b8b2a0e9e0b8d
    posSlider.setRotaryParameters(0.0, 3.1415 * 2.0, true);
    volSlider.setRotaryParameters(0.0, 3.1415 * 2.0, true);
    speedSlider.setRotaryParameters(0.0, 3.1415 * 2.0, true);

    // This align the slider to start at the left side of the knob
    //  Reference: https://docs.juce.com/master/classSlider.html#a8f6f6f9c9b0e9e8f1c1b8b2a0e9e0b8d
    posSlider.setRotaryParameters(0.0, 3.1415 * 2.0, false);
    volSlider.setRotaryParameters(0.0, 3.1415 * 2.0, false);
    speedSlider.setRotaryParameters(0.0, 3.1415 * 2.0, false);

    // This sets the color of the waveform
    waveformDisplay.setColour(WaveformDisplay::waveformColourId, Colours::red);

    // filePickerIcon.setPath(juce::Drawable::parseSVGPath(
    //     "M 0 0 L 10 0 L 10 10 L 0 10 L 0 0 M 2 2 L 8 2 L 8 8 L 2 8 L 2 2 M 4 4 L 6 4 L 6 6 L 4 6 L 4 4 Z"));
    // filePickerIcon.setFill(juce::Colours::brown);

    playStopButtonIcon.setPath(juce::Drawable::parseSVGPath(
        "M 0 0 L 10 5 L 0 10 L 0 0"));
    playStopButtonIcon.setFill(juce::Colours::white);

    // playButton.setColour(juce::TextButton::buttonColourId, juce::Colours::white);

    // playButton.setColour(juce::TextButton::buttonOnColourId, juce::Colours::green);

    playButton.setImages(&playStopButtonIcon);

    

    // Add change listener to the transport source
    player->getTransportSource()->addChangeListener(this);

    addAndMakeVisible(loopToggle);
    loopToggle.setButtonText("Loop");
    loopToggle.addListener(this);

    startTimer(500);
}

DeckGUI::~DeckGUI()
{
    stopTimer();
}

void DeckGUI::drawTurnTable(Graphics &g, int x, int curve)
{
    // std::cout << "DeckGUI::paint"
    //           << "Width: " << getWidth() << "Height: " << getHeight() << std::endl;
    // Draw the turntable

    g.setColour(Colours::grey);
    g.fillEllipse(x, x, curve, curve);
    g.setColour(Colours::white);
    g.drawEllipse(x, x, curve, curve, 5);

    // Draw the tonearm
    g.setColour(Colours::grey);
    // g.fillRect(200, 100, 10, 150);
    g.fillRect(x * 4, x * 2, x / 5, x * 3);
    g.setColour(Colours::white);
    g.drawRect(x * 4, x * 2, x / 5, x * 3, 5);

    // Draw the needle
    g.setColour(Colours::red);
    g.fillRect(curve - x, x * 5, 1, 5);
}

void DeckGUI::paint(Graphics &g)
{
    // g.fillAll(Colours::brown); // clear the background

    // if (player->isPlaying())
    // {
    //     g.fillAll(Colours::green);
    // }
    // else
    // {
    //     g.fillAll(Colours::brown);
    // }

    int x = getWidth() / 8;        // 50
    int curve = getWidth() * 0.75; // 300

    if (player->isPlaying())
    {
        // This will make the to rotate around the centre of the screen
        // https://docs.juce.com/master/classAffineTransform.html
        // g.addTransform(AffineTransform::rotation(0.5, x, x));
        // g.addTransform(AffineTransform::rotation(0.5, x * 4, x * 2));
        // Will rotate based on the position of the player
        g.addTransform(AffineTransform::rotation(player->getPositionRelative() * 4, x * 4, x * 2));
    }
    else
    {
        // This will make the to rotate around the centre of the screen
        // https://docs.juce.com/master/classAffineTransform.html
        // g.addTransform(AffineTransform::rotation(0.0, x, x));
    }

    drawTurnTable(g, x, curve);

    // Draw the waveform
    // g.setColour(Colours::white);
    // Path waveformPath;
    // waveformPath.startNewSubPath(400, 200);
    // waveformPath.lineTo(450, 150);
    // waveformPath.lineTo(500, 250);
    // waveformPath.lineTo(550, 200);
    // waveformPath.lineTo(600, 150);
    // waveformPath.lineTo(650, 250);
    // waveformPath.lineTo(700, 200);
    // g.strokePath(waveformPath, PathStrokeType(2.0f));
}

void DeckGUI::resized()
{
    int rowH = getHeight() / 8;
    playButton.setBounds(getWidth() / 2, 0, getWidth() / 5, rowH / 2);
    // // stopButton.setBounds(0, rowH, getWidth(), rowH);
    // volSlider.setBounds(0, rowH / 1.5, getWidth()/2.5, rowH * 2);
    // speedSlider.setBounds(0, rowH * 2.5, getWidth()/2.5, rowH * 2);
    // // posSlider.setBounds(0, rowH * 4, getWidth(), rowH);
    // std::cout << "DeckGUI::resized" << getWidth() << "rowH: " << rowH << "Height: " << getHeight() << std::endl;
    // posSlider.setBounds(0, rowH * 4.4, getWidth()/2.5, rowH * 2);

    // // playStopButtonIcon.setBounds(0, 0, getWidth(), getHeight());
    // // playButton.setBounds(10, 10, 20, 20);
    // // playStopButtonIcon.setBounds(10, 10, getWidth(), rowH * 2);

    // // stopButton.setBounds(0, rowH / 3, getWidth(), rowH / 3);

    // waveformDisplay.setBounds(0, rowH * 7, getWidth(), rowH);
    // loopToggle.setBounds(0, rowH * 6, getWidth()/4, rowH);

    // loadButton.setBounds(0, rowH * 7, getWidth(), rowH);
    // filePickerButton.setBounds(0, rowH * 7, getWidth(), rowH);

    // eq.setBounds(0, rowH * 2, getWidth(), rowH * 5);
    analyser.setBounds(0, rowH * 2, getWidth(), rowH * 5);
}


// This was wrap into it's own function because of multiple use
void DeckGUI::loadFile()
{ // this does work in 6.1 but the syntax is a little funky
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

void DeckGUI::buttonClicked(Button *button)
{
    // {
    //     if (button == &playButton)
    //     {
    //         std::cout << "Play button was clicked " << std::endl;
    //         player->start();
    //     }
    // if (button == &stopButton)
    // {
    //     std::cout << "Stop button was clicked " << std::endl;
    //     player->stop();
    // }
    // if (button == &loadButton)
    // {
    //     loadFile();
    // }
    // if (button == &loadButton)
    // {
    //     FileChooser chooser{"Select a file..."};
    //     if (chooser.browseForFileToOpen())
    //     {
    //         player->loadURL(URL{chooser.getResult()});
    //         waveformDisplay.loadURL(URL{chooser.getResult()});

    //     }

    // }
    if (button == &loopToggle)
    {
        std::cout << "Loop button was clicked " << loopToggle.getToggleState() << std::endl;
        loop = loopToggle.getToggleState();
        // player->shouldLoop = loopToggle.getToggleState(); // Add this line
    }
}

void DeckGUI::mouseDown(const MouseEvent &event)
{
    std::cout << "DeckGUI::mouseClick" << std::endl;
    // get which component was clicked
    if (event.eventComponent == &playButton)
    {
        // If file is not loaded to the player, default behaviour is to
        // load the file
        if (!player->isLoaded)
        {
            return loadFile(); // this is a lambda function
            // It return so that the rest of the code is not executed
        }

        std::cout << "Play button was clicked " << std::endl;
        if (player->isPlaying())
        {
            player->stop();
        }
        else
        {
            player->start();
        }
        // player->start();
    }
    // if (event.mods.isLeftButtonDown())
    // {
    //     player->start();
    // }
    // if (event.mods.isRightButtonDown())
    // {
    //     player->stop();
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

void DeckGUI::changeListenerCallback(ChangeBroadcaster *source)
{
    std::cout << "DeckGUI::changeListenerCallback" << std::endl;
    if (source == player->getTransportSource())
    {
        std::cout << "DeckGUI::changeListenerCallback" << std::endl;

        // If it's playing set the play button to green
        if (player->isPlaying())
        {
            std::cout << "DeckGUI::changeListenerCallback: isPlaying" << std::endl;
            // set Path to pause icon
            playStopButtonIcon.setPath(juce::Drawable::parseSVGPath(
                "M 0 0 L 10 0 L 10 10 L 0 10 L 0 0 M 2 2 L 8 2 L 8 8 L 2 8 L 2 2 M 4 4 L 6 4 L 6 6 L 4 6 L 4 4 Z"));
            playStopButtonIcon.setFill(juce::Colours::white);
            playButton.setImages(&playStopButtonIcon);
        }
        else
        {
            if (loop)
            {
                return player->start();
            }
            std::cout << "DeckGUI::changeListenerCallback: isNotPlaying" << std::endl;
            // set Path to play icon
            playStopButtonIcon.setPath(juce::Drawable::parseSVGPath(
                "M 0 0 L 10 5 L 0 10 L 0 0"));
            playStopButtonIcon.setFill(juce::Colours::white);
            playButton.setImages(&playStopButtonIcon);
        }

        // while (player->isPlaying())
        // {
        //     // repaint();
        //     // std::cout << "DeckGUI::DeckGUI: is still Playing" << std::endl;
        // }
        // posSlider.setValue(waveformDisplay.getPositionRelative());
    }
}
