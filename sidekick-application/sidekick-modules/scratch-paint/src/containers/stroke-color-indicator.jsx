import {connect} from 'react-redux';
import {defineMessages} from 'react-intl';

import {changeStrokeColor, changeStrokeColor2, changeStrokeColorIndex,
    changeStrokeGradientType} from '../reducers/stroke-style';
import {changeStrokeWidth} from '../reducers/stroke-width';
import {openStrokeColor, closeStrokeColor} from '../reducers/modals';
import {getSelectedLeafItems} from '../helper/selection';
import {setSelectedItems} from '../reducers/selected-items';
import Modes, {GradientToolsModes} from '../lib/modes';
import {isBitmap} from '../lib/format';

import makeColorIndicator from './color-indicator.jsx';

const messages = defineMessages({
    label: {
        id: 'paint.paintEditor.stroke',
        description: 'Label for the color picker for the outline color',
        defaultMessage: 'Outline'
    }
});

const StrokeColorIndicator = makeColorIndicator(messages.label, true);

const mapStateToProps = state => ({
    colorIndex: state.sidekickPaint.color.strokeColor.activeIndex,
    disabled: state.sidekickPaint.mode === Modes.BRUSH ||
        state.sidekickPaint.mode === Modes.TEXT ||
        state.sidekickPaint.mode === Modes.FILL,
    color: state.sidekickPaint.color.strokeColor.primary,
    color2: state.sidekickPaint.color.strokeColor.secondary,
    fillBitmapShapes: state.sidekickPaint.fillBitmapShapes,
    colorModalVisible: state.sidekickPaint.modals.strokeColor,
    format: state.sidekickPaint.format,
    gradientType: state.sidekickPaint.color.strokeColor.gradientType,
    isEyeDropping: state.sidekickPaint.color.eyeDropper.active,
    mode: state.sidekickPaint.mode,
    shouldShowGradientTools: state.sidekickPaint.mode in GradientToolsModes,
    textEditTarget: state.sidekickPaint.textEditTarget
});

const mapDispatchToProps = dispatch => ({
    onChangeColorIndex: index => {
        dispatch(changeStrokeColorIndex(index));
    },
    onChangeColor: (strokeColor, index) => {
        if (index === 0) {
            dispatch(changeStrokeColor(strokeColor));
        } else if (index === 1) {
            dispatch(changeStrokeColor2(strokeColor));
        }
    },
    onChangeStrokeWidth: strokeWidth => {
        dispatch(changeStrokeWidth(strokeWidth));
    },
    onOpenColor: () => {
        dispatch(openStrokeColor());
    },
    onCloseColor: () => {
        dispatch(closeStrokeColor());
    },
    onChangeGradientType: gradientType => {
        dispatch(changeStrokeGradientType(gradientType));
    },
    setSelectedItems: format => {
        dispatch(setSelectedItems(getSelectedLeafItems(), isBitmap(format)));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StrokeColorIndicator);
