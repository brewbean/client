import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
})

const FormTest = () => {
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)
  console.log('Error', errors)
  console.log(watch('example')) // watch input value by passing the name of it
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' name='firstName' ref={register} />
      <p>{errors.firstName?.message}</p>

      <input type='text' name='age' ref={register} />
      <p>{errors.age?.message}</p>

      <input type='submit' />
    </form>
  )
  // return (
  //   /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     {/* register your input into the hook by invoking the "register" function */}
  //     <input name='example' defaultValue='test' ref={register} />
  //     <label>Example Required</label>
  //     {/* include validation with required or other standard HTML validation rules */}
  //     <input name='exampleRequired' ref={register({ required: true })} />
  //     {/* errors will return when field validation fails  */}
  //     {errors.exampleRequired && <span>This field is required</span>}
  //     <br/>
  //     <label>Input Required</label>
  //     <input name='inputRequired' ref={register({ required: true })} />
  //     {/* errors will return when field validation fails  */}
  //     {errors.exampleRequired && <span>This field is required</span>}
  //     <input type='submit' />
  //   </form>
  // )
}
export default FormTest
