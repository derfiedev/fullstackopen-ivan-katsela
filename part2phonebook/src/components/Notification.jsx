export const Notification = ({type, message }) => {
    if (message === null) {
      return null
    }

    var style = "info"

    if (type === 'success') {
      style = 'success'
    }
    if (type === 'error') {
        style = 'error'
    } 

  
    return (
      <div className={style}>
        {message}
      </div>
    )
  }