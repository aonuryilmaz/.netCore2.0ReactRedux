import { connect } from 'react-redux';
import CategoryAdd from '../AddCategory';
import { addCategory } from '../../reducers/category';
const mapStateToProps = (state) => ({
    categories: state.home.categories || []
});

const mapDispatchToProps = {
    addCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd);
