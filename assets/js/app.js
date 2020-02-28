/**
 * Created by bas on 12/08/2017.
 */

var print_button,
    repair_number,
    serial_number;

print_button = document.getElementById('print');
repair_number = document.getElementById('repairnumber');
serial_number = document.getElementById('serialnumber');

function onload () {

    print_button.addEventListener("click", function (e) {
        e.preventDefault();
        print_button.disabled = true;

        var repair_number_val, serial_number_val;

        repair_number_val = repair_number.value;
        serial_number_val = serial_number.value;

        if (repair_number_val && serial_number_val) {

                serial_number_val = serial_number_val.toUpperCase();
                repair_number_val = repair_number_val.toString().toUpperCase().replace('SERV', '');

                while (repair_number_val.length < 5) {
                    repair_number_val = '0' + repair_number_val;
                }

                var print = printLabel(repair_number_val, serial_number_val);

                if (print) {
                    repair_number.value = '';
                    serial_number.value = '';

                    repair_number.focus();
                    checkForm();
                }
        }

    });

    function printLabel(repair_number, serial_number) {
        var path = window.location.pathname;
        path = path.substring(0, path.lastIndexOf('/') + 1);
        path += 'assets/labels/mdrepairlabel.label';

        var label = dymo.label.framework.openLabelFile(path.toString()).getLabelXml();
        var paramsXml = dymo.label.framework. createLabelWriterPrintParamsXml ({ copies: 1 });
        var labelSetXml = new dymo.label.framework.LabelSetBuilder();
        var record = labelSetXml.addRecord();

        record.setText('REPAIR_NUMBER', 'LD REPAIR:' + repair_number);
        record.setText('SERIAL_BARCODE', serial_number);

        var printers = dymo.label.framework.getPrinters();

        if (printers.length == 0) {
            iziToast.show({
                id: null,
                message: 'Geen printer gevonden',
                theme: 'light', // dark
                color: 'red', // blue, red, green, yellow
                layout: 1,
                balloon: false,
                close: true,
                rtl: false,
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                targetFirst: true,
                toastOnce: false,
                timeout: 5000,
                drag: true,
                pauseOnHover: true,
                resetOnHover: false,
                progressBar: true,
                animateInside: true,
                transitionIn: 'fadeInUp',
                transitionOut: 'fadeOut',
                transitionInMobile: 'fadeInUp',
                transitionOutMobile: 'fadeOutDown',
                onOpening: function () {},
                onOpened: function () {},
                onClosing: function () {},
                onClosed: function () {}
            });
            return false;
        }

        var printerName = "";
        for (var i = 0; i < printers.length; i++) {
            if(printers[i].printerType == "LabelWriterPrinter") {
                printerName = printers[i].name;
                break;
            }
        }

        if (printerName == "") {
            iziToast.show({
                id: null,
                message: 'Geen printer gevonden',
                theme: 'light', // dark
                color: 'red', // blue, red, green, yellow
                layout: 1,
                balloon: false,
                close: true,
                rtl: false,
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                targetFirst: true,
                toastOnce: false,
                timeout: 5000,
                drag: true,
                pauseOnHover: true,
                resetOnHover: false,
                progressBar: true,
                animateInside: true,
                transitionIn: 'fadeInUp',
                transitionOut: 'fadeOut',
                transitionInMobile: 'fadeInUp',
                transitionOutMobile: 'fadeOutDown',
                onOpening: function () {},
                onOpened: function () {},
                onClosing: function () {},
                onClosed: function () {}
            });
            return;
        }

        dymo.label.framework.printLabel(printerName, paramsXml, label, labelSetXml);

        iziToast.show({
            id: null,
            message: 'Bezig met printen',
            theme: 'light', // dark
            color: 'green', // blue, red, green, yellow
            layout: 1,
            balloon: false,
            close: true,
            rtl: false,
            position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            targetFirst: true,
            toastOnce: false,
            timeout: 5000,
            drag: true,
            pauseOnHover: true,
            resetOnHover: false,
            progressBar: true,
            animateInside: true,
            transitionIn: 'fadeInUp',
            transitionOut: 'fadeOut',
            transitionInMobile: 'fadeInUp',
            transitionOutMobile: 'fadeOutDown',
            onOpening: function () {},
            onOpened: function () {},
            onClosing: function () {},
            onClosed: function () {}
        });

        return true;
    }
}

function initTests()
{
    if(dymo.label.framework.init)
    {
        dymo.label.framework.init(onload());
    } else {
        onload();
    }
}

initTests();
