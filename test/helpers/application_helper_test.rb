require "test_helper"

class ApplicationHelperTest < ActionView::TestCase
  test "converte markdown simples para html" do
    assert_dom_equal "<p>Este é um texto em <strong>negrito</strong>.</p>\n", markdown("Este é um texto em **negrito**.")
  end

  test "converte cabeçalhos markdown" do
    assert_dom_equal "<h2>Título Principal</h2>\n", markdown("## Título Principal")
  end

  test "escapa html malicioso inserido no markdown" do
    result = markdown("<script>alert('xss')</script>")
    refute_includes result, "<script>"
  end

  test "converte blocos de código com cercas" do
    result = markdown("```ruby\nputs 'hello'\n```")
    assert_includes result, "<pre"
    assert_includes result, "<code class=\"ruby\""
  end

  test "retorna string vazia para entrada nil ou vazia" do
    assert_equal "", markdown(nil)
    assert_equal "", markdown("")
  end
end
