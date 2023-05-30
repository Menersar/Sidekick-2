import {connect} from 'react-redux';
import {defineMessages} from 'react-intl';

import {changeFillColor, changeFillColor2, changeFillColorIndex, changeFillGradientType} from '../reducers/fill-style';
import {openFillColor, closeFillColor} from '../reducers/modals';
import {getSelectedLeafItems} from '../helper/selection';
import {setSelectedItems} from '../reducers/selected-items';
import Modes, {GradientToolsModes} from '../lib/modes';
import {isBitmap} from '../lib/format';

import makeColorIndicator from './color-indicator.jsx';

const messages = defineMessages({
    label: {
        id: 'paint.paintEditor.fill',
        description: 'Label for the color picker for the fill color',
        defaultMessage: 'Fill'
    }
});

const FillColorIndicator = makeColorIndicator(messages.label, false);

const mapStateToProps = state => ({
    colorIndex: state.sidekickPaint.color.fillColor.activeIndex,
    disabled: state.sidekickPaint.mode === Modes.LINE,
    color: state.sidekickPaint.color.fillColor.primary,
    color2: state.sidekickPaint.color.fillColor.secondary,
    colorModalVisible: state.sidekickPaint.modals.fillColor,
    fillBitmapShapes: state.sidekickPaint.fillBitmapShapes,
    format: state.sidekickPaint.format,
    gradientType: state.sidekickPaint.color.fillColor.gradientType,
    isEyeDropping: state.sidekickPaint.color.eyeDropper.active,
    shouldShowGradientTools: state.sidekickPaint.mode in GradientToolsModes,
    textEditTarget: state.sidekickPaint.textEditTarget
});

const mapDispatchToProps = dispatch => ({
    onChangeColorIndex: index => {
        dispatch(changeFillColorIndex(index));
    },
    onChangeColor: (fillColor, index) => {
        if (index === 0) {
            dispatch(changeFillColor(fillColor));
        } else if (index === 1) {
            dispatch(changeFillColor2(fillColor));
        }
    },
    onOpenColor: () => {
        dispatch(openFillColor());
    },
    onCloseColor: () => {
        dispatch(closeFillColor());
    },
    onChangeGradientType: gradientType => {
        dispatch(changeFillGradientType(gradientType));
    },
    setSelectedItems: format => {
        dispatch(setSelectedItems(getSelectedLeafItems(), isBitmap(format)));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FillColorIndicator);
