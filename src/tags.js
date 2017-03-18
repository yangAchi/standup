import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './Tags.css';

const App = React.createClass({
    handleDelete: function(i) {
        this.props.onDelete(i);
    },
    handleAddition: function(tag) {
        this.props.onAddition(tag);
    },
    handleDrag: function(tag, currPos, newPos) {
        this.props.onDrag(tag, currPos, newPos);
    },

    render: function() {
        let tags = this.props.tags;
        return (
            <div>
                <ReactTags tags={tags}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag} />
            </div>
        )
    }
});

export default App;
