from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str
    password: str
    about: str = ""
    is_active: bool = True


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    id: int


class UserLogin(BaseModel):
    email: str
    password: str


class User(UserBase):
    id: int
    confirmPassword: str
    class Config:
        orm_model = True
