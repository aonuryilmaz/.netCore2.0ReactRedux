import { connect } from 'react-redux';
import Home from '../Home';
import { getCategoriesAsync } from '../../reducers/category';
const mapStateToProps = (state) => ({
    categories: state.home.categories || []
});

const mapDispatchToProps={
    getCategoriesAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
