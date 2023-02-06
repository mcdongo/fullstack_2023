const Filter = (props) => {
    return (
        <div>
            <form>
                <div>
                  filter shown with 
                  <input value={props.filter} onChange={props.handleFilterChange} />
                </div>
            </form>
        </div>
    )
}

export default Filter