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


    addAndMakeVisible(volSlider);
    addAndMakeVisible(speedSlider);
    addAndMakeVisible(posSlider);

    addAndMakeVisible(waveformDisplay);

    addAndMakeVisible(player->analyserModel);

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

    // This aligns the slider to the centre of the knobD
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
    // if player is playing
    // will map the position of the player to the rotation of the tonearm
    // and rotate the tonearm
    if (player->isPlaying())
    {
        // This will make the to rotate around the centre of the screen
        // https://docs.juce.com/master/classAffineTransform.html
        // g.addTransform(AffineTransform::rotation(0.0, x, x));
        g.addTransform(AffineTransform::rotation(player->getPositionRelative() * 4, x * 4, x * 2));
    }
    g.drawRect(x * 4, x * 2, x / 5, x * 3, 5);

    // Draw the needle
    g.setColour(Colours::red);
    g.fillRect(curve - x, x * 5, 1, 5);
}

void DeckGUI::paint(Graphics &g)
{
    int x = getWidth() / 8;        // 50
    int curve = getWidth() * 0.75; // 300

    drawTurnTable(g, x, curve);
}

void DeckGUI::resized()
{
    int rowH = getHeight() / 8;
    playButton.setBounds(getWidth() / 2, 0, getWidth() / 5, rowH / 2);
    volSlider.setBounds(0, rowH / 1.5, getWidth() / 4, rowH * 2);
    speedSlider.setBounds(0, rowH * 2.5, getWidth() / 4, rowH * 2);
    posSlider.setBounds(0, rowH * 4.5, getWidth() / 4, rowH * 2);
    std::cout << "DeckGUI::resized" << getWidth() << "rowH: " << rowH << "Height: " << getHeight() << std::endl;


    waveformDisplay.setBounds(0, rowH * 7, getWidth(), rowH);
    loopToggle.setBounds(0, rowH * 6, getWidth() / 4, rowH);


    player->analyserModel.setBounds(getWidth() / 2, rowH, getWidth(), rowH * 5.5);
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
    if (button == &loopToggle)
    {
        std::cout << "Loop button was clicked " << loopToggle.getToggleState() << std::endl;
        loop = loopToggle.getToggleState();
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


void DeckGUI::filesDropped(const juce::StringArray &files, int x, int y)
{
    std::cout << "DeckGUI::filesDropped" << std::endl;

    for (const auto &filename : files)
    {
        std::cout << "DeckGUI::filesNames" << filename << std::endl;
        // This will convert the filename to a URL of file://
        // player->loadURL(juce::URL{juce::File{filename}});
        // waveformDisplay.loadURL(juce::URL{juce::File{filename}});

        loadDJ(juce::URL{juce::File{filename}});
    }
}

void DeckGUI::timerCallback()
{
    // std::cout << "DeckGUI::timerCallback" << std::endl;
    waveformDisplay.setPositionRelative(
        player->getPositionRelative());
    repaint();
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

void DeckGUI::loadDJ(URL audioURL)
{
    player->loadURL(audioURL);
    waveformDisplay.loadURL(audioURL);
}
