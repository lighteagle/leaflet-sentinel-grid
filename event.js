$(function () {
    initPanel()

})

function initPanel() {
    var $leftPanel = $('#left-panel')

    $leftPanel.empty()
    $leftPanel.append(appendSlider())
    addPanelEvent()
}
function addPanelEvent() {
    var validValues = ['2016', '2018', '2019', '2020', '2021'];
    var slider = $('#custom-slider');
    var sliderValue = $('#slider-value');

    // Set the initial value
    var initialValue = validValues[0];
    slider.val(initialValue);
    sliderValue.text(initialValue);

    // Update the selected value and display
    slider.on('input', function () {
        var value = $(this).val();
        sliderValue.text(value);
        map.removeLayer(sentinelLayer['2016']);
        map.removeLayer(sentinelLayer['2018']);
        map.removeLayer(sentinelLayer['2019']);
        map.removeLayer(sentinelLayer['2020']);
        map.removeLayer(sentinelLayer['2021']);
        value != 2017 ?sentinelLayer[value].addTo(map): sentinelLayer['2016'].addTo(map);
    });

    // Restrict the selectable values
    slider.on('input', function () {
        var value = $(this).val();
        if (!validValues.includes(value)) {
            var closestValue = validValues.reduce(function (prev, curr) {
                return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
            });
            $(this).val(closestValue);
            sliderValue.text(closestValue);

        }
    });

}

function appendSlider() {
    var context = `
        <div class="container mt-4">
            <input type="range" class="custom-range custom-slider" id="custom-slider" min="2016" max="2021" step="1">
            <p class='slider-value' class="mt-2">Sentinel Cloud Free : <span id="slider-value"></span></p>
            <p class='slider-value'>Source : https://s2maps.eu/</p>
        </div>
    `
    return context


}


