var Student = React.createClass({
    render: function() {
        return <h2>{this.props.data.firstname}</h2>
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
        return (<div>
            {
                this.state.studentList.map(
                    function(currentStudent) {
                        return <Student data={currentStudent}/>
                    }
                )
            }
        </div>)
    }

})

ReactDOM.render(
    <StudentList/>, document.getElementById('app')
)