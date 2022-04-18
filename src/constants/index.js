export default {
    activeOpacity: 0.7,

    containerAbsolute: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 50,
    },

    container: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
        position: 'relative',
    },

    // flex
    // ///////////////////////////////////////////////////////////////////////////
    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexRowCenterAlign: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRowCenter: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    flexRowSpace: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}
