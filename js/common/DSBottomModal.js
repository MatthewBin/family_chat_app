/**
 * Created by maxiaobin on 17/5/19.
 * @providesModule DSBottomModal
 */

'use strict'

import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

export default class DSBottomModal extends Component {
    constructor(props) {
        super(props);

        this.setVisible = this.setVisible.bind(this);
    }

    setVisible() {
        if (this.props.visibleCallBack) {
            this.props.visibleCallBack(false);
        }
    }

    render() {
        return (
            <Modal  {...this.props} >
                <View style={Styles.modalBackground}>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => {
                            this.setVisible();
                        } }>
                        <View style={{ flex: 1 }}></View>
                    </TouchableWithoutFeedback>
                    <View style={{
                        height: this.props.height,
                        flexDirection: this.props.flexDirection,
                        backgroundColor: this.props.backgroundColor,
                    }}>
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        );
    }
}

DSBottomModal.propTypes = {
    backgroundColor: PropTypes.string,
    height: PropTypes.number,
    visibleCallBack: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    flexDirection: PropTypes.oneOf(['row', 'column']),
}

DSBottomModal.defaultProps = {
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
};

const Styles = StyleSheet.create({
    //modal背景
    modalBackground: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'flex-end',
    }
});
