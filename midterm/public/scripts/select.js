function chooseDevice(value, selectedValue) {
  const onoff = ["Light", "Fan", "Cooker", "Fridge", "Washing Machine"];
  const openclose = ["Door", "Window", "Garage", "Dishwasher"];
  const updown = ["Thermostat", "Television", "Air Conditioner", "Oven"];

  if (onoff.includes(value)) {
    document.getElementById("statusType").innerHTML = `
    <select class="form-control" id="deviceStatus" name="status">
    <option value="On">On</option>
    <option value="Off">Off</option>
</select>

        `;
    //pick the selected value
    document.getElementById("deviceStatus").value = selectedValue;
  } else if (updown.includes(value)) {
    document.getElementById("statusType").innerHTML = `
        <input type="range" class="form-control slider" name="status" min="0" id="slider"
        max="100" value="${selectedValue}">
    <!-- slider value -->
    <span id="sliderValue">${selectedValue}</span>
        `;

    document.getElementById("slider").addEventListener("input", function () {
      document.getElementById("sliderValue").innerHTML = this.value;
    });
  } else if (openclose.includes(value)) {
    document.getElementById("statusType").innerHTML = `
        <select class="form-control" name="status" id="deviceStatus">
            <option value="Open">Open</option>
            <option value="Close">Close</option>
        </select>
        `;
    //pick the selected value
    document.getElementById("deviceStatus").value = selectedValue;
  } else {
    document.getElementById("statusType").innerHTML = `
        <input type="text" class="form-control" name="status" placeholder="Not Applicable" value="${selectedValue}" >
        `;

  }
}
