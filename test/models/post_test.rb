require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "deve ser invalido sem titulo, descricao e corpo" do
    post = Post.new
    assert_not post.valid?
    assert post.errors[:title].any?
    assert post.errors[:description].any?
    assert post.errors[:body].any?
  end

  test "deve ser valido com todos os campos preenchidos" do
    post = Post.new(title: "Novidades da IA", description: "Breve resumo", body: "Corpo do texto da noticia")
    assert post.valid?
  end

  test "deve buscar postagens por titulo de forma case-insensitive" do
    Post.create!(title: "Google Gemini 1.5", description: "Novo modelo", body: "Detalhes do modelo")
    Post.create!(title: "ChatGPT-5 Rumores", description: "Nova versão", body: "Detalhes dos rumores")

    results = Post.search_by_title("gemini")
    assert_equal 1, results.count
    assert_equal "Google Gemini 1.5", results.first.title

    results_case = Post.search_by_title("CHATGPT")
    assert_equal 1, results_case.count
    assert_equal "ChatGPT-5 Rumores", results_case.first.title
  end
end
