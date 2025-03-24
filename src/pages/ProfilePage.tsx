import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Edit2,
  Save,
  Camera,
  LogOut,
  Book,
  History,
  Heart,
  CircleUser,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getHistoryManga, getBookmarkedManga } from "@/lib/data/manga-data";
import { MangaCard } from "@/components/manga/MangaCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserData {
  name: string;
  email: string;
  avatar?: string;
  username?: string;
  bio?: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Lịch sử đọc truyện và truyện yêu thích
  const historyManga = getHistoryManga();
  const bookmarkedManga = getBookmarkedManga();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        username: parsedUser.username || "",
        bio: parsedUser.bio || "",
        avatar: parsedUser.avatar || "",
      });
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to update profile
    setTimeout(() => {
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(formData));
      setUserData(formData);
      setIsEditing(false);
      setIsLoading(false);
      setSuccessMessage("Thông tin hồ sơ đã được cập nhật thành công!");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!userData) {
    return (
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-10">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Sidebar/Profile Card */}
        <div className="space-y-4">
          <Card className="border-none shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="relative mx-auto mb-4 h-24 w-24">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={userData.avatar || ""} alt={userData.name} />
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                    {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  onClick={() => alert("Tính năng đang phát triển!")}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <h2 className="mt-2 text-xl font-bold">{userData.name}</h2>
              <p className="text-sm text-muted-foreground">{userData.email}</p>

              {userData.username && (
                <p className="mt-1 text-sm text-primary">@{userData.username}</p>
              )}

              {userData.bio && <p className="mt-4 text-sm text-muted-foreground">{userData.bio}</p>}

              <div className="mt-6 flex justify-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Thống kê</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Book className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Đang đọc</span>
                  </div>
                  <span className="font-medium">{historyManga.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Yêu thích</span>
                  </div>
                  <span className="font-medium">{bookmarkedManga.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <History className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Lịch sử</span>
                  </div>
                  <span className="font-medium">{historyManga.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {successMessage && (
            <div className="animate-fade-in mb-4 rounded-md bg-green-100 p-4 text-green-800">
              {successMessage}
            </div>
          )}

          {isEditing ? (
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Chỉnh sửa thông tin hồ sơ</CardTitle>
                <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ tên</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        className="pl-10"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Tên người dùng</Label>
                    <div className="relative">
                      <CircleUser className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        className="pl-10"
                        value={formData.username || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Giới thiệu</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.bio || ""}
                      onChange={handleChange}
                      placeholder="Vài điều về bạn..."
                    ></textarea>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-1">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                      Đang lưu...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Save className="h-4 w-4" />
                      Lưu thay đổi
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="history">Lịch sử đọc</TabsTrigger>
                <TabsTrigger value="bookmarks">Truyện yêu thích</TabsTrigger>
              </TabsList>
              <TabsContent value="history" className="pt-4">
                {historyManga.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">Bạn chưa đọc truyện nào.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {historyManga.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.manga.coverImage}
                            alt={item.manga.title}
                            className="h-16 w-12 rounded object-cover"
                          />
                          <div>
                            <h3 className="font-medium">{item.manga.title}</h3>
                            <p className="text-sm text-muted-foreground">Chương {item.chapter}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Tiếp tục
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="bookmarks" className="pt-4">
                {bookmarkedManga.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">Bạn chưa có truyện yêu thích nào.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {bookmarkedManga.map((manga, index) => (
                      <MangaCard key={manga.id} manga={manga} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
