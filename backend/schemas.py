from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str
    password: str
    about: str
    is_active: bool


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    id: int


class UserLogin(BaseModel):
    email: str
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_model = True


class BlogBase(BaseModel):
    title: str
    sub_title: str
    content: str
    image: str
    user_id: int


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BlogBase):
    id: int


class Blog(BlogBase):
    id: int
    like_count: int
    comment_count: int

    class Config:
        orm_model = True


class CommentBase(BaseModel):
    user_id: int
    blog_id: int
    content: str


class CommentCreate(CommentBase):
    pass


class Comment(CommentBase):
    id: int

    class Config:
        orm_model = True


class LikeBase(BaseModel):
    user_id: int
    blog_id: int


class LikeCreate(LikeBase):
    pass


class Like(LikeBase):
    id: int

    class Config:
        orm_model = True
