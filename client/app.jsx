var Student = React.createClass({
    getInitialState: function() {
        return {}
    },
    handleClick: function() {
        var ReactThis = this;
        axios.get('http://localhost:3000/student/' + this.props.data._id)
            .then(function(response) {
                console.log(response.data);
                ReactThis.setState(response.data);
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    render: function() {
        if (this.state.firstname) {
            var nameNode = (
                <div>
                    <h2>Name: {this.state.firstname}</h2>
                    <h2>Age: {this.state.age}</h2>
                    <h2>School: {this.state.school}</h2>
                </div>
            )
        } else {
            var nameNode = <h2 onClick={this.handleClick}>{this.props.data.firstname}</h2>
        }
        return (
            <div>
                {nameNode}
                <hr/>
            </div>
        )
    }
})

var StudentList = React.createClass({
    getInitialState: function() {
      return {
          studentList: [],
      }
    },
    componentDidMount: function() {
        var ReactThis = this;
        axios.get('http://localhost:3000/student')
            .then(function(response) {
                ReactThis.setState({
                    studentList: response.data
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    },


    render: function() {
        var ReactThis = this;
        return (<div>
            <h1>Student List</h1>
            {
                this.state.studentList.map(
                    function(currentStudent) {
                        return <Student data={currentStudent} key={currentStudent._id}/>
                    }
                )
            }
        </div>)
    }

})

ReactDOM.render(
    <StudentList/>, document.getElementById('app')
)