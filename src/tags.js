import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './Tags.css';

//import Countries from 'country-list';

//const countriesList = Countries().getData().map(t => t.name);

const App = React.createClass({
    // getInitialState: function() {
    //     return {
    //         tags: []
    //        // suggestions: countriesList
    //     }
    // },
    handleDelete: function(i) {
        this.props.onDelete(i);
        // let tags = this.state.tags;
        // tags.splice(i, 1);
        // this.setState({tags: tags});
    },
    handleAddition: function(tag) {
        this.props.onAddition(tag);
        // let tags = this.state.tags;
        // tags.push({
        //     id: tags.length + 1,
        //     text: tag
        // });
        // this.setState({tags: tags});
    },
    handleDrag: function(tag, currPos, newPos) {
        this.props.onDrag(tag, currPos, newPos);
        // let tags = this.state.tags;

        // // mutate array
        // tags.splice(currPos, 1);
        // tags.splice(newPos, 0, tag);

        // // re-render
        // this.setState({ tags: tags });
    },
    render: function() {
        let tags = this.props.tags;
        //let suggestions = this.state.suggestions;
        return (
            <div>
                <ReactTags tags={tags}
                    //suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag} />
            </div>
        )
    }
});

export default App;
