import Part from './Part'

const Content = ({parts}) => {
    return (
      <div>
        {parts.map(item =>
                <Part part={item.name} exercises={item.exercises} key={item.id}/>
        )}
      </div>
    )
}

export default Content