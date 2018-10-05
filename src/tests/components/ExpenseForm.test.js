import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('should render ExpenseForm', () => {
    const wrapper = shallow(<ExpenseForm />)

    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)

    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
    const value = 'New description'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('description')).toBe(value)
})

test('should set note', () => {
    const value = 'New Note'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').simulate('change', {
        target: { value }
    })

    expect(wrapper.state('note')).toBe(value)
})

test('should set amount', () => {
    const value = '15.00'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })

    expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount with invalid input', () => {
    const value = "15.000"
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })

    expect(wrapper.state('amount')).toBe("")
})

test('should call onSubmit prop for valid form', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    })
})

test('should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm />)
    const now = moment()
    wrapper.find('SingleDatePicker').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set new focus state', () => {
    const focused = true
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused })
    expect(wrapper.state('calendarFocused')).toBe(focused)
})

