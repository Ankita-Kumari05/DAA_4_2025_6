#include<iostream>
#include<vector>
using namespace std;
void heapifyup(vector<int>& heap,int i)
{
    while(i>0)
    {
        int parent=(i-1)/2;
        if(heap[parent]>heap[i])
        {
            swap(heap[parent],heap[i]);
            i=parent;
        }
        else
        {
            break;
        }
    }
}
void heapifydown(vector<int>&heap ,int i, int size)
{
    while(true)
    {
    int smallest=i;
    int left=2*i+1;
    int right=2*i+2;
    if(left<size&&heap[smallest]>heap[left])
    {
        smallest=left;
    }
    if(right<size&&heap[smallest]>heap[right])
    {
        smallest=right;
    }
    if(smallest!=i)
    {
        swap(heap[i],heap[smallest]);
        i=smallest;
    }
    else
    {
        break;
    }
}
}
int main()
{
    int k;
    int n;
    cout<<"Enter number of scores";
    cin>>n;
    cout<<"Enter cut-off score";
    cin>>k;
    vector<int> heap;
    for(int i=0;i<n;i++)
    {
        int score;
        cin>>score;
        if(heap.size()<k)
        {
            heap.push_back(score);
            heapifyup(heap,heap.size()-1);
        }
        else if(score>heap[0])
        {
            heap[0]=score;
            heapifydown(heap,0,k);
        }
        if(heap.size()<k)
        {
            cout<<-1<<endl;
        }
        else
        {
            cout<<heap[0]<<endl;
        }
    }
    return 0;
}