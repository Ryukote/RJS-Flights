import React from 'react';
import AsyncSelect from 'react-select/async';
import { authenticate, getIATACode } from '../../Utilities/AmadeusAPI';

class FlightSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            originText: ""
        }

        this.originSelected = this.originSelected.bind(this);
        this.getIATASuggestions = this.getIATASuggestions.bind(this);
    }

    async componentDidMount() {
        await authenticate();
    }

    getIATASuggestions = async () => {
        return await getIATACode(this.state.originText)
            .then(result => {
                this.setState({
                    suggestions: result
                });

                return this.state.suggestions;
            })
            .catch(error => {
                throw error;
            });
    }

    originSelected = (inputText) => {
        this.setState({
            originText: inputText
        });
    }

    render() {
        return(
            <div id="flightSearch">
                <div id="originIATA">
                    <AsyncSelect
                        placeholder="Enter departure city..."
                        options={this.state.suggestions}
                        loadOptions={this.getIATASuggestions}
                        onInputChange={(e) => this.originSelected(e)}
                        isClearable={true}
                    />
                </div>
            </div>
        );
    }
}

export default FlightSearch;
