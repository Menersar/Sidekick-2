import {connect} from 'react-redux';
import DragLayer from '../components/drag-layer/drag-layer.jsx';

const mapStateToProps = state => ({
    dragging: state.sidekickGui.assetDrag.dragging,
    currentOffset: state.sidekickGui.assetDrag.currentOffset,
    img: state.sidekickGui.assetDrag.img
});

export default connect(mapStateToProps)(DragLayer);
