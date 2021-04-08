import React, { useCallback, useState } from 'react'
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { UserAxiosProvider } from '../index'
import { useUser } from '../hooks/useUser'
import { useAxios } from '../hooks/useAxios'
import * as axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

interface UserProps {
  token: string
  user: string
}

interface WSResponse {
  flag: string
}

const fakeUser: UserProps = { user: 'Diego Milito', token: 'asdkadajkdhslakjdlkasj' }

const InnerComponent = () => {
  const { user, setUser } = useUser<UserProps>()
  const [response, loading, call] = useAxios<WSResponse>('/fakeurl')

  const renderUser = useCallback(() => {
    if (user)
      return (
        <div>
          <button title="Logout" onClick={() => setUser(null)} />
          <p>{user.token}</p>
          <p>{user.user}</p>
        </div>
      )

    return (
      <div>
        <button title="Login" onClick={() => setUser(fakeUser)} />
        <p>No hay usuario</p>
      </div>
    )
  }, [user, setUser])

  return (
    <div>
      {response && <img alt="bandera" src={response.flag} />}
      {loading && <p>Cargando</p>}
      <button title="FakeAxios" onClick={() => call()} />
      {renderUser()}
    </div>
  )
}

const Wrapper = () => {
  const [user, setUser] = useState<UserProps | null>(null)
  const headers = user && { Authorization: user.token }
  return (
    <UserAxiosProvider
      onAxiosError={(err) => console.log(err)}
      user={user}
      headers={headers}
      onUser={(newuser) => {
        expect(newuser).toEqual(newuser ? newuser : null)
        setUser(newuser)
      }}>
      <InnerComponent />
    </UserAxiosProvider>
  )
}

const simulateAxios = async (loading: string) => {
  fireEvent.click(screen.getByTitle('FakeAxios'))
  expect(mockedAxios.default).toHaveBeenCalled()
  await act(async () => {})
  return waitFor(() => expect(screen.queryByText(loading)).toBeNull())
}

test('deberia cargar bien los datos', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fakeResponse: any = { data: { flag: '/bandera.png' }, status: 200 }
  mockedAxios.default.mockResolvedValue(fakeResponse)
  render(<Wrapper />)

  const loginBtn = 'Login'
  const logoutBtn = 'Logout'
  const noUser = 'No hay usuario'
  const loading = 'Cargando'

  expect(screen.queryByTitle(loginBtn)).not.toBeNull()

  screen.getByText(noUser)
  fireEvent.click(screen.getByTitle(loginBtn))

  await waitFor(() => expect(screen.queryByText(fakeUser.token)).not.toBeNull())

  await simulateAxios(loading)
  await waitFor(() => expect(screen.queryByText(fakeUser.token)).not.toBeNull())

  /*expect(screen.queryByTitle(loginBtn)).toBeNull()

  screen.getByText(fakeUser.token)
  screen.getByText(fakeUser.user)


  screen.getByAltText('bandera')

  fireEvent.click(screen.getByTitle('Logout'))
  screen.getByText(noUser)
  await act(async () => {})

  await simulateAxios(loading)

  console.log(mockedAxios.default.mock.calls)*/
})
