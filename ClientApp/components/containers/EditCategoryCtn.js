import { connect } from 'react-redux';
import EditCategory from '../EditCategory';
import { getCategory } from '../../reducers/category';
const mapStateToProps = (state) => ({
    child: state.home.child || [],
    parent: state.home.parent || {}
});

const mapDispatchToProps = (dispatch) => ({
    getCategory: (id) => { dispatch(getCategory(id)) },
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
